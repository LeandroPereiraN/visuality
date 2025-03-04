import type { PexelsPhoto } from "./interfaces/api/photos";
import type { PexelsVideo } from "./interfaces/api/videos";

export type MediaItem = "Photos" | "Videos" | "Favorites";

export interface MediaProps {
  mediaItem: MediaItem;
  searchQuery: string | undefined;
}

export interface MediaState extends MediaProps {
  setMediaItem: (mediaItem: MediaItem) => void;
  setSearchQuery: (searchQuery: string | undefined) => void
}

export type MediaWithItem =
  | (PexelsPhoto & { mediaItem: 'Photos' })
  | (PexelsVideo & { mediaItem: 'Videos' });