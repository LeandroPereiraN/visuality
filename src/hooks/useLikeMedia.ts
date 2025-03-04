import type { PexelsPhoto } from "@definitions/interfaces/api/photos";
import type { PexelsVideo } from "@definitions/interfaces/api/videos";
import type { MediaItem } from "@definitions/media";
import { isLikedMedia, likeMedia, unlikeMedia } from "@utils/likeMediaManager";
import { useState } from "react";

interface UseLikeMediaProps {
  media: PexelsPhoto | PexelsVideo;
  mediaItem: MediaItem;
}

type UseLikeMediaReturn = [
  boolean,
  () => void
]

export const useLikeMedia = ({ media, mediaItem }: UseLikeMediaProps): UseLikeMediaReturn => {
  const { id } = media;
  const [liked, setLiked] = useState(isLikedMedia(id, mediaItem));

  const toggleLikeMedia = () => {
    const isLiked = isLikedMedia(id, mediaItem)

    if (isLiked) {
      unlikeMedia(id, mediaItem)
    } else {
      likeMedia(media, mediaItem)
    }

    setLiked(!isLiked);
  }

  return [liked, toggleLikeMedia]
}