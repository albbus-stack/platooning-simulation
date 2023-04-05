import type p5Types from "p5";
import { useCallback, useContext, useEffect } from "react";
import Sketch from "react-p5";
import PageVisibility from "react-page-visibility";
import { SliverContext } from "../components/sliver/SliverProvider";
import { DataContext } from "./DataProvider";

let roadMarkerX = 0;
let oscillationY = 0;

let distance: number[] = [];
let velocity: number[] = [];
let acceleration: number[] = [];
let externalInputs: number[] = [];
let carPoints: number[] = [];

let isPlaying = false;
let button: p5Types.Element;

let timeTick = -1;
let intervalRef: NodeJS.Timeout;

const CAR_WIDTH = 100;
const SCALE_FACTOR = 0.9;
let TIME_HEADWAY = 1.5;
let CAR_SPACING = 200;
let CAR_NUMBER = 6;

let previousSliverHeight = 0;
let previousCarNumber = 0;
let previousCarSpacing = 0;
let previousTimeHeadway = 0;
let previousLeadingCarChart = [{} as { time: number; velocity: number }];
let leadingCarChartIndex = 0;

const P5Canvas: React.FC = () => {
  const { carNumber, setData, carSpacing, timeHeadway, leadingCarChart } =
    useContext(DataContext);
  const { height, setIsSliverOpen, isSliverOpen, setIsGraphSliver } =
    useContext(SliverContext);

  const sliverHeight = isSliverOpen ? height : 0;

  // This function toggles the play/pause button and the interval
  const togglePlay = useCallback(
    (isFailed: boolean = false) => {
      if (isPlaying) {
        clearInterval(intervalRef);
        button.html(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"> <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /> </svg>'
        );
        isPlaying = false;
      } else if (!isFailed) {
        // This is the interval that updates the data for the graphs
        intervalRef = setInterval(() => {
          timeTick++;

          setData((car) => {
            if (car.length === 1) {
              let carList = [] as {
                distance: number;
                velocity: number;
                time: number;
              }[][];
              for (let i = 0; i < CAR_NUMBER; i++) {
                carList.push([]);
              }
              car = carList;
              return car;
            }

            return car.map((prev, i) => {
              return [
                ...prev,
                {
                  distance: distance[i],
                  velocity: velocity[i],
                  time: timeTick,
                },
              ];
            });
          });
        }, 1000);
        button.html(
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /> </svg>'
        );
        isPlaying = true;
      }
    },
    [setData]
  );

  // This function resets the canvas and the data
  const resetCanvas = useCallback(
    (p5: p5Types) => {
      carPoints = [];
      distance = [];
      velocity = [];
      CAR_NUMBER = carNumber;
      CAR_SPACING = (carSpacing - 1) * 10 + 110;
      TIME_HEADWAY = timeHeadway;

      for (let i = 0; i < CAR_NUMBER; i++) {
        carPoints.push(p5.width - 50 - i * CAR_SPACING);
        distance.push(0);
        velocity.push(0);
      }
      roadMarkerX = p5.width + 100;

      setData(() => {
        let carList = [] as {
          distance: number;
          velocity: number;
          time: number;
        }[][];
        for (let i = 0; i < CAR_NUMBER; i++) {
          carList.push([]);
        }
        return carList;
      });

      timeTick = -1;
    },
    [setData, carNumber, carSpacing, timeHeadway]
  );

  // The p5.js setup function
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );

    // Setup of the play/pause button
    button = p5.createButton(
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"> <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /> </svg>'
    );
    button.addClass("p5-button");
    button.mousePressed(togglePlay);
  };

  // The p5.js draw function
  const draw = (p5: p5Types) => {
    // Reset the canvas if the car spacing changes or the number of cars changes
    if (
      carSpacing !== previousCarSpacing ||
      carNumber !== previousCarNumber ||
      timeHeadway !== previousTimeHeadway ||
      leadingCarChart !== previousLeadingCarChart
    ) {
      resetCanvas(p5);
    }
    previousCarSpacing = carSpacing;
    previousCarNumber = carNumber;
    previousTimeHeadway = timeHeadway;
    previousLeadingCarChart = leadingCarChart;

    // Resize the canvas if the sliver height changes
    if (previousSliverHeight !== sliverHeight)
      p5.resizeCanvas(window.innerWidth, window.innerHeight - sliverHeight);
    previousSliverHeight = sliverHeight;

    // Offset the canvas
    p5.translate(0, p5.height / 2 + 25);

    // Road
    p5.background(226, 232, 260);
    p5.fill(100, 116, 139);
    p5.rect(0, -50, p5.width * 2, 100).scale(SCALE_FACTOR, 1);

    // Road marking
    p5.fill(254);
    p5.rect(roadMarkerX, -50, 15, 100);

    if (isPlaying) {
      roadMarkerX -=
        leadingCarChart[
          Math.floor(leadingCarChartIndex / 10) % leadingCarChart.length
        ].velocity / 2;
      if (roadMarkerX < 0) {
        roadMarkerX = p5.width * (2 - SCALE_FACTOR);
      }
    }

    // Cars loop
    p5.textSize(16);
    for (let i = 0; i < CAR_NUMBER; i++) {
      // Car illustration
      p5.fill(0);
      p5.rect(
        carPoints[i],
        -25 + Math.sin(oscillationY + i) * 1.5,
        CAR_WIDTH,
        50,
        5
      );

      // Car number
      p5.textAlign(p5.CENTER);
      p5.fill(255);
      p5.text(
        i + 1,
        carPoints[i] + CAR_WIDTH / 2,
        5 + Math.sin(oscillationY + i) * 1.5
      );

      if (i !== CAR_NUMBER - 1) {
        // Distance text
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        p5.text(
          Math.round(carPoints[i] - (carPoints[i + 1] + CAR_WIDTH)) / 10 + "m",
          (carPoints[i + 1] + CAR_WIDTH + carPoints[i]) / 2,
          -77
        );

        // The simulation fails if the distance between two cars is negative
        if (carPoints[i] - (carPoints[i + 1] + CAR_WIDTH) < 0) {
          togglePlay(true);
        }

        // Distance calculation
        distance[i] =
          Math.round(Math.abs(carPoints[i] - (carPoints[i + 1] + CAR_WIDTH))) /
          10;

        // Distance indicators
        p5.fill(0);
        p5.line(
          carPoints[i + 1] + CAR_WIDTH,
          -70,
          carPoints[i + 1] + CAR_WIDTH,
          -50
        );
        p5.line(carPoints[i], -70, carPoints[i], -50);
        p5.line(carPoints[i + 1] + CAR_WIDTH, -60, carPoints[i], -60);
      }
    }

    // Don't compute any value if the simulation is paused or if the simulation failed
    if (!isPlaying) return;

    // Update car velocities and positions
    if (leadingCarChartIndex === 5) {
      leadingCarChartIndex = 0;
    }
    velocity[0] =
      (Math.sign(Math.random() - 0.5) *
        leadingCarChart[Math.floor(leadingCarChartIndex / 10)].velocity) /
      50;
    leadingCarChartIndex++;

    for (let i = 1; i < CAR_NUMBER; i++) {
      // externalInputs[i] =
      //   (-1 / TIME_HEADWAY) * velocity[i - 1] +
      //   (1 / TIME_HEADWAY) * distance[i - 1];

      acceleration[i] =
        (-1 / TIME_HEADWAY) * (velocity[i - 1] - velocity[i]) +
        (1 / TIME_HEADWAY) * (distance[i - 1] - distance[i]);
      velocity[i] = velocity[i - 1] + acceleration[i];
      carPoints[i] -= velocity[i - 1];
    }
    oscillationY += 0.1;
  };

  // This takes care of pausing when the page is not visible
  const onPageVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) {
      clearInterval(intervalRef);
      button.html(
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"> <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /> </svg>'
      );
      isPlaying = false;
    }
  };

  // This effect takes care of the keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        togglePlay();
      } else if (e.key === "g") {
        setIsGraphSliver((isGraph) => {
          setIsSliverOpen((isSliverOpen) => {
            if (!isGraph && isSliverOpen) {
              return true;
            } else {
              return !isSliverOpen;
            }
          });
          return true;
        });
      } else if (e.key === "s") {
        setIsGraphSliver((isGraph) => {
          setIsSliverOpen((isSliverOpen) => {
            if (isGraph && isSliverOpen) {
              return true;
            } else {
              return !isSliverOpen;
            }
          });
          return false;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearInterval(intervalRef);
      isPlaying = false;
      setIsSliverOpen(false);
    };
  }, [setIsSliverOpen, setIsGraphSliver, togglePlay]);

  return (
    <PageVisibility onChange={onPageVisibilityChange}>
      <Sketch
        // @ts-expect-error - This is a bug in p5Types
        setup={setup}
        // @ts-expect-error - This is a bug in p5Types
        draw={draw}
        windowResized={(p5) => {
          p5.resizeCanvas(window.innerWidth, window.innerHeight - sliverHeight);
        }}
      />
    </PageVisibility>
  );
};

export default P5Canvas;
