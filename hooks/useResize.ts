import { useCallback, useEffect, useState } from "react";

interface Props {
  minHeight?: number;
  maxHeight?: number;
}

interface ReturnProps {
  height: number;
  enableResize: () => void;
  setHeightFromSize: (size: "S" | "M" | "L") => void;
  size: "S" | "M" | "L";
}

const useResize = ({ minHeight, maxHeight }: Props): ReturnProps => {
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(0);
  const [size, setSize] = useState<"S" | "M" | "L">("M");

  useEffect(() => {
    setHeightFromSize("M");
  }, []);

  const setHeightFromSize = useCallback(
    (size: "S" | "M" | "L") => {
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
    [minHeight, isResizing, setHeight]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  return { height, enableResize, setHeightFromSize, size };
};

export default useResize;
