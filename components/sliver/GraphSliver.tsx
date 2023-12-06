import { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { DataContext } from "../DataProvider";

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

import * as m from "../../src/paraglide/messages";

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

const GraphSliver: React.FC = () => {
  const [distanceChartIndex, setDistanceChartIndex] = useState(0);
  const [velocityChartIndex, setVelocityChartIndex] = useState(0);

  const { graphData } = useContext(DataContext);

  return (
    <>
      <section className="flex flex-col items-center justify-center w-1/2 h-full">
        <select
          className="pr-2 my-2 text-lg text-center bg-transparent"
          onChange={(e) => setDistanceChartIndex(parseInt(e.target.value))}
          onKeyDown={(e) => e.preventDefault()}
        >
          {graphData.map((_, i) => {
            if (i !== graphData.length - 1 || i === 0)
              return (
                <option key={i} value={i}>{`${
                  m.distance().charAt(0).toUpperCase() + m.distance().slice(1)
                } ${i + 1}-${i + 2}`}</option>
              );
          })}
        </select>
        <div className="w-full h-full">
          <Line
            data={{
              labels: graphData[distanceChartIndex]?.map((d) => d.time),
              datasets: [
                {
                  data: graphData[distanceChartIndex]?.map((d) => d.distance),
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
                    text: m.time() + " (s)",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: m.distance() + " (m)",
                  },
                },
              },
            }}
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-1/2 h-full">
        <select
          className="pr-2 my-2 text-lg text-center bg-transparent"
          onChange={(e) => setVelocityChartIndex(parseInt(e.target.value))}
          onKeyDown={(e) => e.preventDefault()}
        >
          {graphData.map((_, i) => (
            <option key={i} value={i}>{`${
              m.velocity().charAt(0).toUpperCase() + m.velocity().slice(1)
            } ${i + 1}`}</option>
          ))}
        </select>
        <div className="w-full h-full">
          <Line
            data={{
              labels: graphData[velocityChartIndex].map((d) => d.time),
              datasets: [
                {
                  data: graphData[velocityChartIndex].map((d) => d.velocity),
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
                    text: m.time() + " (s)",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: m.velocity() + " (m/s)",
                  },
                },
              },
            }}
          />
        </div>
      </section>
    </>
  );
};

export default GraphSliver;
