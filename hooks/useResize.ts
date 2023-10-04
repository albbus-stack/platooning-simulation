import { useCallback, useEffect, useState } from "react";
import { Size } from "../components/sliver/SliverProvider";

interface ResizeReturnProps {
  height: number;
  enableResize: () => void;
  setHeightFromSize: (size: Size) => void;
  size: Size;
}

const useResize = (): ResizeReturnProps => {
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(500);
  const [size, setSize] = useState<Size>("M");

  // Set height based on a certain size
  const setHeightFromSize = useCallback(
    (size: Size) => {
      switch (size) {
        case "S":
          setSize("S");
          setHeight((window.innerHeight / 5) * 2);
          break;
        case "M":
          setSize("M");
          setHeight(window.innerHeight / 2);
          break;
        case "L":
          setSize("L");
          setHeight((window.innerHeight / 8) * 5);
          break;
      }
    },
    [setHeight]
  );

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  // Resize the height of the element considering the boundaries
  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        if (
          newHeight >= (window.innerHeight / 5) * 2 &&
          newHeight <= (window.innerHeight / 3) * 2
        ) {
          setHeight(newHeight);
        }
      }
    },
    [isResizing, setHeight]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  useEffect(() => {
    setHeightFromSize("M");
  }, [setHeightFromSize]);

  return { height, enableResize, setHeightFromSize, size };
};

export default useResize;
