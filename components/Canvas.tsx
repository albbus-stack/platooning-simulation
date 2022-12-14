import React, { useRef, useEffect, useState } from "react";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => void;
  sliverHeight: number;
}

const Canvas: React.FC<CanvasProps> = ({
  draw,
  sliverHeight,
  ...rest
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState(0);

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    let frameCount = 0;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      setAnimationFrameId(requestAnimationFrame(render));
    };
    render();
  };

  const stopAnimation = () => {
    if (typeof window !== "undefined")
      window.cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }

    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight - sliverHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight - sliverHeight);
    }
    startAnimation();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, sliverHeight]);

  return (
    <>
      <canvas ref={canvasRef} height={height} width={width} {...rest} />
    </>
  );
};

export default Canvas;
