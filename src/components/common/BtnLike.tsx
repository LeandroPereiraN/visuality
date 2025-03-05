import { HeartOutline, Heart } from "@components/gallery/icons/HeartIcons";
import type { PexelsPhoto } from "@definitions/interfaces/api/photos";
import type { PexelsVideo } from "@definitions/interfaces/api/videos";
import type { MediaItem } from "@definitions/media";
import { useLikeMedia } from "@hooks/useLikeMedia";

interface BtnLikeProps {
  media: PexelsPhoto | PexelsVideo;
  mediaItem: MediaItem;
}

export const BtnLike = ({ media, mediaItem }: BtnLikeProps) => {
  const [liked, toggleLikeMedia] = useLikeMedia({ media, mediaItem });

  return (
    <button
      className={`p-1.5 md:-translate-y-10 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
        transition duration-200 cursor-pointer rounded-xl active:scale-80
        ${liked ? "translate-y-0 opacity-100 md:translate-y-0 md:opacity-100 bg-pink-600 hover:bg-pink-700" : ""}`}
      type="button"
      onClick={toggleLikeMedia}
    >
      {liked ? <Heart className="h-8 w-8" /> : <HeartOutline className="h-8 w-8" />}
    </button>
  );
};