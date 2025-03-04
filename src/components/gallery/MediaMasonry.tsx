import Masonry from "react-masonry-css";
import { Photo } from "@components/gallery/Photo";
import { Video } from "@components/gallery/Video";
import type { MediaWithItem } from "@definitions/media";

interface MediaGridProps {
  media: MediaWithItem[];
}

export const MediaMasonry = ({ media }: MediaGridProps) => (
  <Masonry
    breakpointCols={{
      default: 3,
      1024: 2,
      640: 1
    }}
    className="flex -ml-4 w-screen max-w-[1550px] px-6"
    columnClassName="pl-4"
  >
    {media.map((m) => (
      <div key={`${m.mediaItem}-${m.id}`} className="mb-4">
        {
          m.mediaItem === "Photos"
            ? <Photo photo={m} />
            : <Video video={m} />
        }
      </div>
    ))}
  </Masonry>
);
