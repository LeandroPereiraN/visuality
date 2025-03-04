import { useState, useEffect, useCallback } from "react";
import { getPhotos, getPhotosByQuery, getVideos, getVideosByQuery } from "@api/pexels";
import type { PexelsPhotos } from "@interfaces/api/photos";
import type { PexelsVideos } from "@interfaces/api/videos";
import type { MediaItem, MediaWithItem } from "@definitions/media";
import { useMediaContext } from "@hooks/useMediaContext";
import { getAllLikedMedia } from "@utils/likeMediaManager";

export const useMediaFetcher = () => {
  const [media, setMedia] = useState<MediaWithItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const mediaItem = useMediaContext((state) => state.mediaItem)
  const searchQuery = useMediaContext((state) => state.searchQuery)

  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);

      let response;
      if (mediaItem === "Photos") {
        response = searchQuery
          ? await getPhotosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getPhotos({ page, per_page: 21 });
      } else if (mediaItem === "Videos") {
        response = searchQuery
          ? await getVideosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getVideos({ page, per_page: 21 });
      } else {
        const allLikedMedia = getAllLikedMedia({ page, per_page: 21 });

        response = allLikedMedia.map(({ media, mediaItem }) => {
          return { ...media, mediaItem } as MediaWithItem;
        })
      }

      const mediaCollection = getMediaCollection(response, mediaItem);
      if (mediaCollection.length === 0) {
        setHasMore(false);
        return;
      }

      const existingIds = new Set(media.map(m => m.id));
      const newMedia = mediaCollection.filter(item => !existingIds.has(item.id));

      setMedia(prev => [...prev, ...newMedia]);
    } catch (err) {
      console.error("Error fetching media: ", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [mediaItem, searchQuery, page, media]);

  useEffect(() => {
    fetchMedia();
  }, [page]);

  return { media, isLoading, hasMore, error, page, setPage, fetchMedia };
};

const getMediaCollection = (response: any, mediaItem: MediaItem): MediaWithItem[] => {
  if (mediaItem === "Favorites") {
    return response as MediaWithItem[];
  }

  if (mediaItem === "Photos") {
    const photos = (response as PexelsPhotos).photos;
    return photos.map(photo => ({ ...photo, mediaItem: "Photos" } as MediaWithItem));
  } else {
    const videos = (response as PexelsVideos).videos;
    return videos.map(video => ({ ...video, mediaItem: "Videos" } as MediaWithItem));
  }
};