import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface P5CanvasProps {
  sliverHeight: number;
}

let x = 50;
let y = 0;
let carPoints: number[] = [];
let previousSliverHeight = 0;
const CAR_WIDTH = 100;

const P5Canvas = ({ sliverHeight }: P5CanvasProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    for (let i = 0; i < 8; i++) {
      carPoints.push(50 + i * 150);
    }
  };

  const draw = (p5: p5Types) => {
    // Resize the canvas if the sliver height changes
    if (previousSliverHeight !== sliverHeight)
      p5.resizeCanvas(window.innerWidth, window.innerHeight - sliverHeight);
    previousSliverHeight = sliverHeight;

    // Offset the canvas
    p5.translate(0, p5.height / 2 + 25);

    // Road
    p5.background(226, 232, 240);
    p5.fill(100, 116, 139);
    p5.rect(0, -50, p5.width, 100);

    // Road marking
    p5.fill(254);
    p5.rect(x, -50, 15, 100);
    x += 3;
    if (x > p5.width) {
      x = 0;
    }

    p5.fill(0);
    p5.textSize(16);
    for (let i = 0; i < 8; i++) {
      //Car
      p5.rect(carPoints[i], -25 + Math.sin(y + i) * 1.5, CAR_WIDTH, 50);

      if (i !== 0) {
        // Distance text
        p5.textAlign(p5.CENTER);
        p5.text(
          Math.round(
            Math.abs(carPoints[i] - (carPoints[i - 1] + CAR_WIDTH / 2))
          ) /
            10 +
            "m",
          (carPoints[i - 1] + CAR_WIDTH + carPoints[i]) / 2,
          -77
        );

        // Distance indicators
        p5.line(
          carPoints[i - 1] + CAR_WIDTH,
          -70,
          carPoints[i - 1] + CAR_WIDTH,
          -50
        );
        p5.line(carPoints[i], -70, carPoints[i], -50);
        p5.line(carPoints[i - 1] + CAR_WIDTH, -60, carPoints[i], -60);
      }
    }
    y = y + 0.1;

    // Update car positions
    for (let i = 0; i < 7; i++) {
      if (x > p5.width / 2) {
        carPoints[i] -= 0.03 * i;
      } else {
        carPoints[i] += 0.03 * i;
      }
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={(p5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight - sliverHeight);
      }}
    />
  );
};

export default P5Canvas;
