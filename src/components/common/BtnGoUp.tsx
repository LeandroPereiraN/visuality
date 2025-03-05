import { Arrow } from "@components/gallery/icons/ArrowIcons";
import { useEffect, useState } from "react";

export const BtnGoUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 0);
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-black/90 p-3 rounded-full w-fit h-fit mb-4 cursor-pointer transition duration-300 active:scale-95 ${isVisible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}>
      <Arrow className="-rotate-90 h-8 w-8 md:h-10 md:w-10" />
    </button>
  )
}
