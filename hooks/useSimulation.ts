const CAR_WIDTH = 100;
const CAR_HEIGHT = 50;
const HEADWAY = 3;

import seedrandom from "seedrandom";

const useSimulation = () => {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Background
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Center coordinates
    const x0 = ctx.canvas.width / 2;
    const y0 = ctx.canvas.height / 2;
    const x = ctx.canvas.width - ((frameCount * 8) % ctx.canvas.width);

    // Road
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(0, y0 - 50, ctx.canvas.width, 100);

    // Road lines
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y0 - 50, 10, 100);

    // Car 1
    ctx.fillStyle = "#000000";
    let y: number;
    for (let i = 0; i < 8; i++) {
      const seed = "predefinedSeedForCruisingOnTheYAxis" + i;
      y = y0 + Math.sin(frameCount / 20) * seedrandom(seed)() * 3;
      ctx.fillRect(
        ctx.canvas.width - (CAR_WIDTH * 5 + CAR_WIDTH * HEADWAY * i) / 2,
        y - CAR_HEIGHT / 2,
        CAR_WIDTH,
        CAR_HEIGHT
      );
    }
  };

  return { draw };
};

export default useSimulation;
