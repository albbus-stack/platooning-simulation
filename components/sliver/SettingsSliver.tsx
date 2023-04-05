import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Line } from "react-chartjs-2";

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

// @ts-ignore
import * as DragPlugin from "chartjs-plugin-dragdata";

// Register the chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  DragPlugin
);

const MAX_VELOCITY = 50;

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
      <section className="flex flex-col items-center justify-center w-full h-full gap-10 text-lg">
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
            step="0.05"
            min="1.1"
            max="5"
            value={timeHeadway}
            onChange={(e) => setTimeHeadway(parseFloat(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="w-10 font-bold text-center">{timeHeadway}</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full gap-2 py-5">
        <h2 className="text-lg">Leading car velocity</h2>
        <Line
          data={{
            labels: leadingCarChart
              .map((entry) => entry.time)
              .concat(leadingCarChart[leadingCarChart.length - 1].time + 1),
            datasets: [
              {
                data: leadingCarChart
                  .map((entry) => entry.velocity)
                  .concat(leadingCarChart[0].velocity),
                fill: false,
                borderColor: "rgb(118, 136, 163)",
                tension: 0.4,
                pointRadius: (ctx) => (ctx.dataIndex === 5 ? 0 : 5),
                pointHoverRadius: 10,
                pointHitRadius: (ctx) => (ctx.dataIndex === 5 ? 0 : 20),
              },
            ],
          }}
          options={{
            onHover: (event, chartElements) => {
              (event?.native?.target as HTMLElement).style.cursor =
                chartElements?.length > 0 ? "pointer" : "auto";
            },
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    if (context.dataIndex === 5) {
                      return "Initial velocity";
                    }
                    return `${context.dataset.data[context.dataIndex]} m/s`;
                  },
                },
              },
              legend: {
                display: false,
              },
              dragData: {
                round: 0,
                magnet: {
                  to: (value) => Math.round(value / 5) * 5,
                },
                onDragStart: function (_, __, index) {
                  if (index === 5) {
                    return false;
                  }
                },
                onDragEnd: function (_, __, index, value) {
                  if (index !== 5) {
                    setLeadingCarChart((prev) => {
                      const newChart = [...prev];
                      newChart[index].velocity = value;
                      return newChart;
                    });
                  }
                },
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
                max: MAX_VELOCITY,
              },
            },
          }}
        />
      </section>
    </>
  );
};
export default SettingsSliver;
