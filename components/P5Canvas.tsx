import Sketch from "react-p5";
import p5Types from "p5";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface P5CanvasProps {
  sliverHeight: number;
  setData: Dispatch<
    SetStateAction<{ distance: number; velocity: number; time: number }[][]>
  >;
}

let roadMarkerX = 0;
let oscillationY = 0;
let distance: number[] = [];
let velocity: number[] = [];
let carPoints: number[] = [];
let previousSliverHeight = 0;
let isPlaying = false;
let button: p5Types.Element;

let initialTime = -1;
let lastTime = -1;

let intervalRef: NodeJS.Timeout;

const CAR_WIDTH = 100;
const CAR_NUMBER = 8;
const SCALE_FACTOR = 0.9;

const P5Canvas = ({ sliverHeight, setData }: P5CanvasProps) => {
  useEffect(() => {
    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  // The p5.js setup function
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    for (let i = 0; i < CAR_NUMBER; i++) {
      carPoints.push(50 + i * 150);
      distance.push(0);
      velocity.push(0);
    }
    roadMarkerX = p5.width - 50;

    // The function that toggles the play/pause button and the interval
    const togglePlay = () => {
      if (isPlaying) {
        clearInterval(intervalRef);
        lastTime = initialTime;
        button.html("⏵︎");
        button.style("background-color", "green");
        isPlaying = false;
      } else {
        // This is the interval that updates the data for the graphs
        intervalRef = setInterval(() => {
          initialTime++;

          setData((car) => {
            if (car.length === 1) {
              car = [[], [], [], [], [], [], [], []] as {
                distance: number;
                velocity: number;
                time: number;
              }[][];
            }
            return car.map((prev, i) => {
              return [
                ...prev,
                {
                  distance: distance[i],
                  velocity: velocity[i],
                  time: initialTime,
                },
              ];
            });
          });
        }, 1000);
        button.html("⏸");
        button.style("background-color", "#f44336");
        isPlaying = true;
      }
    };

    // Setup of the play/pause button
    button = p5.createButton("⏵︎");
    button.addClass("p5-button");
    button.mousePressed(togglePlay);
  };

  // The p5.js draw function
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
    p5.rect(0, -50, p5.width * 2, 100).scale(SCALE_FACTOR, 1);

    // Road marking
    p5.fill(254);
    p5.rect(roadMarkerX, -50, 15, 100);

    if (isPlaying) {
      roadMarkerX -= 3;
      if (roadMarkerX < 0) {
        roadMarkerX = p5.width * (2 - SCALE_FACTOR);
      }
    }

    // Cars loop
    p5.textSize(16);
    for (let i = 0; i < CAR_NUMBER; i++) {
      //Car
      p5.fill(0);
      p5.rect(
        carPoints[i],
        -25 + Math.sin(oscillationY + i) * 1.5,
        CAR_WIDTH,
        50
      );

      // Car number
      p5.textAlign(p5.CENTER);
      p5.fill(255);
      p5.text(
        Math.abs(i - CAR_NUMBER),
        carPoints[i] + CAR_WIDTH / 2,
        5 + Math.sin(oscillationY + i) * 1.5
      );

      if (i !== 0) {
        // Distance text
        p5.fill(0);
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

        // Distance and velocity calculation
        distance[i] =
          Math.round(
            Math.abs(carPoints[i] - (carPoints[i - 1] + CAR_WIDTH / 2))
          ) / 10;
        if (roadMarkerX > p5.width / 2) {
          velocity[i] = 0.03 * i;
        } else {
          velocity[i] = -0.03 * i;
        }

        // Distance indicators
        p5.fill(0);
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

    // Stop the animation if the play button is not pressed
    if (!isPlaying) return;
    oscillationY += 0.1;

    // Update car positions
    for (let i = 0; i < 7; i++) {
      if (roadMarkerX > p5.width / 2) {
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
