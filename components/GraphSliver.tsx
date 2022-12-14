import React from "react";
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
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  height: number;
  enableResize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setSize: (size: "S" | "M" | "L") => void;
  size: "S" | "M" | "L";
  data: { x: number; time: number }[];
}

const GraphSliver: React.FC<GraphSliverProps> = ({
  isOpen,
  setOpen,
  height,
  enableResize,
  setSize,
  size,
  data,
}: GraphSliverProps) => {
  return (
    <div
      style={{
        height: height,
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
      }}
      className="fixed flex flex-col justify-center align-center bottom-0 left-0 w-full bg-slate-3 bg-slate-300 z-20 border-t-2 border-black p-4"
    >
      {isOpen && (
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
                  setSize("S");
                }}
              />

              <GraphSliverButton
                size={size}
                label="M"
                onClick={() => {
                  setSize("M");
                }}
              />

              <GraphSliverButton
                size={size}
                label="L"
                onClick={() => {
                  setSize("L");
                }}
              />
            </div>
            <div>
              <button
                className="font-bold mr-2 border border-slate-800 border-b-0 p-1 hover:text-slate-500 hover:bg-slate-300 transition-all duration-300 rounded-md rounded-b-none w-10 pb-1"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-row w-full justify-between h-full">
        <div className="h-full w-1/2 flex flex-col justify-center items-center">
          <select className="bg-transparent mt-2 text-center">
            <option value="actual value 1">Distance 1-2</option>
            <option value="actual value 2">Display Text 2</option>
            <option value="actual value 3">Display Text 3</option>
          </select>
          <div className="w-full h-full">
            <Line
              data={{
                labels: data.map((d) => d.time),
                datasets: [
                  {
                    data: data.map((d) => d.x),
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
              }}
            />
          </div>
        </div>

        <div className="h-full w-1/2 my-auto">
          <Line
            data={{
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [
                {
                  label: "My First Dataset",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  borderColor: "rgb(63, 73, 87)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphSliver;
