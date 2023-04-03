import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-dragdata";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";

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

const MAX_VELOCITY = 50;
const VELOCITY_STEP = 5;

const SettingsSliver = () => {
  const {
    carNumber,
    setCarNumber,
    carSpacing,
    setCarSpacing,
    timeHeadway,
    setTimeHeadway,
    leadingCarChart,
    setLeadingCarChart,
  } = useContext(DataContext);

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full h-full gap-5 text-lg">
        <div className="flex flex-row items-center w-full gap-10 px-20">
          <p className="w-28">Car number</p>
          <input
            type="range"
            min="2"
            max="10"
            value={carNumber}
            onChange={(e) => setCarNumber(parseInt(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="w-10 font-bold text-center">{carNumber}</p>
        </div>
        <div className="flex flex-row items-center w-full gap-10 px-20">
          <p className="w-28">Car spacing</p>
          <input
            type="range"
            step="0.1"
            min="2"
            max="20.0"
            value={carSpacing}
            onChange={(e) => setCarSpacing(parseFloat(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="w-10 font-bold text-center">{carSpacing}</p>
        </div>
        <div className="flex flex-row items-center w-full gap-10 px-20">
          <p className="w-28">Time headway</p>
          <input
            type="range"
            step="0.1"
            min="1.1"
            max="5"
            value={timeHeadway}
            onChange={(e) => setTimeHeadway(parseFloat(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="w-10 font-bold text-center">{timeHeadway}</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full gap-2 py-10 text-lg">
        <div className="flex flex-row justify-between w-full pl-10">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setLeadingCarChart((l) =>
                    l.map((entry) => {
                      if (entry.time === i) {
                        return {
                          time: i,
                          velocity:
                            entry.velocity === MAX_VELOCITY
                              ? MAX_VELOCITY
                              : entry.velocity + VELOCITY_STEP,
                        };
                      } else {
                        return entry;
                      }
                    })
                  );
                  console.log(leadingCarChart);
                }}
                className="transition-colors duration-300 rounded-lg cursor-pointer text-slate-800 hover:text-slate-500 disabled:text-slate-400 disabled:cursor-not-allowed"
                disabled={leadingCarChart[i].velocity === MAX_VELOCITY}
              >
                <UpIcon />
              </button>
            );
          })}
        </div>
        <div className="w-full h-full pt-2 pr-1">
          <Line
            data={{
              labels: leadingCarChart.map((entry) => entry.time),
              datasets: [
                {
                  data: leadingCarChart.map((entry) => entry.velocity),
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
                    text: "velocity (m/s)",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="flex flex-row justify-between w-full pl-10">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setLeadingCarChart((l) =>
                    l.map((entry) => {
                      if (entry.time === i) {
                        return {
                          time: i,
                          velocity:
                            entry.velocity === 0
                              ? 0
                              : entry.velocity - VELOCITY_STEP,
                        };
                      } else {
                        return entry;
                      }
                    })
                  );
                  console.log(leadingCarChart);
                }}
                className="transition-colors duration-300 cursor-pointer text-slate-800 hover:text-slate-500 disabled:text-slate-400 disabled:cursor-not-allowed"
                disabled={leadingCarChart[i].velocity === 0}
              >
                <DownIcon />
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default SettingsSliver;
