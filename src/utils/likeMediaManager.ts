import type { PexelsPhoto } from "@definitions/interfaces/api/photos";
import type { PexelsVideo } from "@definitions/interfaces/api/videos";
import type { MediaItem } from "@definitions/media";

interface LikedMedia {
  media: PexelsPhoto | PexelsVideo;
  mediaItem: MediaItem;
}

interface AllLikedMediaProps {
  page: number;
  per_page: number;
}

export const getAllLikedMedia = ({ page = 1, per_page = 20 }: AllLikedMediaProps) => {
  const likedPhotos = getLikedMedia("Photos");
  const likedVideos = getLikedMedia("Videos");

  const maxLength = Math.max(likedPhotos.length, likedVideos.length);
  const allLikedMedia: LikedMedia[] = [];

  for (let i = 0; i < maxLength; i++) {
    if (likedPhotos[i] !== undefined) allLikedMedia.push({ media: likedPhotos[i], mediaItem: "Photos" });
    if (likedVideos[i] !== undefined) allLikedMedia.push({ media: likedVideos[i], mediaItem: "Videos" });
  }

  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page

  return allLikedMedia.slice(startIndex, endIndex);
}

const getLikedMedia = (mediaItem: MediaItem): PexelsPhoto[] | PexelsVideo[] => {
  return JSON.parse(localStorage.getItem(mediaItem) || "[]");
}

export const isLikedMedia = (mediaId: number, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  return likedMedia.some(({ id }) => id === mediaId);
}


export const unlikeMedia = (mediaId: number, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  const newLikedMedia = likedMedia.filter(({ id }) => id !== mediaId);
  localStorage.setItem(mediaItem, JSON.stringify(newLikedMedia));
}

export const likeMedia = (media: PexelsPhoto | PexelsVideo, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  const newLikedMedia = [...likedMedia, media];
  localStorage.setItem(mediaItem, JSON.stringify(newLikedMedia));
}