import { useState, useRef } from "react";
import type { PexelsVideo } from "@interfaces/api/videos"
import { Skeleton } from "./Skeleton";
import { BtnDownload } from "@components/common/BtnDownload";
import { BtnLike } from "@components/common/BtnLike";
import { VideoIcon } from "./icons/MediaIcons";

interface VideoProps {
  video: PexelsVideo;
}

export const Video = ({ video }: VideoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectRatio = video.width / video.height;
  const videoSource = video.video_files.find(file => file.quality === "hd")?.link || video.video_files[0].link;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoLoaded && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <article
      className="relative w-full overflow-hidden rounded-xl shadow-lg before:content-[''] before:z-100 before:absolute before:top-0 before:left-0 before:bg-gradient-to-b before:from-black/25 before:to-transparent before:w-full before:h-24 md:before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:w-full after:h-40 md:after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className="z-[1000] absolute top-0 w-full p-4 flex justify-between items-center">
        <VideoIcon className="h-8 w-8 text-white" />
        <BtnLike media={video} mediaItem="Videos" />
      </header>

      <main
        className="relative w-full"
        style={{
          paddingBottom: `${(1 / aspectRatio) * 100}%`,
        }}
      >
        <Skeleton />

        <img
          src={video.image}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 300ms ease-in-out'
          }}
          onLoad={() => setImageLoaded(true)}
        />

        {isHovered && (
          <video
            ref={videoRef}
            src={videoSource}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            onCanPlayThrough={() => setVideoLoaded(true)}
            onLoadStart={() => setVideoLoaded(false)}
            muted
            autoPlay
            loop
            preload="auto"
          />
        )}
      </main>

      <footer className="z-1000 absolute bottom-0 flex items-center justify-between gap-2 w-full p-4 md:translate-y-10 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200">
        <a
          href={video.user.url}
          target="_blank"
          className="text-white font-semibold hover:text-gray-300 transition-colors"
        >
          {video.user.name}
        </a>
        <BtnDownload url={new URL(videoSource)} />
      </footer>
    </article>
  );
};