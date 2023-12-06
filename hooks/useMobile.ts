import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobilePortrait(
        window.matchMedia("(orientation: portrait)").matches &&
          window.innerWidth < 500
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobilePortrait;
};
