import { Download } from "./icons/DonwloadIcons";

interface BtnDownloadProps {
  url: URL;
}

export const BtnDownload = ({ url }: BtnDownloadProps) => {
  let lastClicked = 0;

  const handleDownload = async () => {
    const now = Date.now();
    if (now - lastClicked <= 1000) return;

    lastClicked = now;

    const media = await fetch(url.href);
    const mediaBlob = await media.blob();
    const mediaURL = URL.createObjectURL(mediaBlob);

    const anchorDownload = document.createElement("a");
    anchorDownload.href = mediaURL;
    anchorDownload.download = url.pathname
    anchorDownload.click();

    URL.revokeObjectURL(mediaURL);
  };

  return (
    <button
      type="button"
      aria-label="Download"
      onClick={handleDownload}
      className="text-white md:bg-black/90 md:hover:bg-[#2a2a2a] transition-colors duration-150 font-semibold p-1.5 md:px-4 rounded-md cursor-pointer md:outline-2 outline-white -outline-offset-1 flex items-center gap-1 active:scale-95"
    >
      <Download className="h-8 w-8 md:h-6 md:w-6" />
      <span className="hidden md:block">Download</span>
    </button>
  );
};
