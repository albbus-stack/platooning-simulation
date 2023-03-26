import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GraphSliverButton from "./GraphSliverButton";
import { SliverContext } from "./SliverProvider";

// Register the chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphSliverProps {
  data: { distance: number; velocity: number; time: number }[][];
}

const GraphSliver: React.FC<GraphSliverProps> = ({
  data,
}: GraphSliverProps) => {
  const {
    height,
    enableResize,
    setHeightFromSize,
    size,
    isSliverOpen,
    setIsSliverOpen,
  } = useContext(SliverContext);

  const [distanceChartCar, setDistanceChartCar] = useState(0);
  const [velocityChartCar, setVelocityChartCar] = useState(0);

  const distanceChartIndex = distanceChartCar;
  const velocityChartIndex = velocityChartCar;

  return (
    <div
      style={{
        height: height,
        transform: isSliverOpen ? "translateY(0)" : "translateY(100%)",
      }}
      className="fixed bottom-0 left-0 z-30 flex flex-col justify-center w-full p-4 border-t-2 border-black align-center bg-slate-3 bg-slate-300"
    >
      {isSliverOpen && (
        <>
          <div
            className="absolute top-[-0.2rem] h-9 w-full translate-y-[-50%] cursor-row-resize select-none"
            onMouseDown={enableResize}
          ></div>
          <div className="absolute z-30 top-[-2.2rem] px-3 left-0 w-full flex flex-row justify-between select-none">
            <div>
              <GraphSliverButton
                size={size}
                label="S"
                onClick={() => {
                  setHeightFromSize("S");
                }}
              />

              <GraphSliverButton
                size={size}
                label="M"
                onClick={() => {
                  setHeightFromSize("M");
                }}
              />

              <GraphSliverButton
                size={size}
                label="L"
                onClick={() => {
                  setHeightFromSize("L");
                }}
              />
            </div>
            <div>
              <button
                className="w-10 p-1 pb-1 mr-2 font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 hover:text-slate-500 hover:bg-slate-300"
                onClick={() => setIsSliverOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-row justify-between w-full h-full">
        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <select
            className="mt-2 text-center bg-transparent"
            onChange={(e) => setDistanceChartCar(parseInt(e.target.value))}
          >
            {data.map((_, i) => {
              if (i !== data.length - 1 || i === 0)
                return (
                  <option key={i} value={i}>{`Distance ${i + 1}-${
                    i + 2
                  }`}</option>
                );
            })}
          </select>
          <div className="w-full h-full">
            <Line
              data={{
                labels: data[distanceChartIndex]?.map((d) => d.time),
                datasets: [
                  {
                    data: data[distanceChartIndex]?.map((d) => d.distance),
                    fill: false,
                    borderColor: "rgb(118, 136, 163)",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "time (s)",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "distance (m)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <select
            className="mt-2 text-center bg-transparent"
            onChange={(e) => setVelocityChartCar(parseInt(e.target.value))}
          >
            {data.map((_, i) => (
              <option key={i} value={i}>{`Velocity ${i + 1}`}</option>
            ))}
          </select>
          <div className="w-full h-full">
            <Line
              data={{
                labels: data[velocityChartIndex].map((d) => d.time),
                datasets: [
                  {
                    data: data[velocityChartIndex].map((d) => d.velocity),
                    fill: false,
                    borderColor: "rgb(63, 73, 87)",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "time (s)",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "velocity (m/s)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphSliver;
