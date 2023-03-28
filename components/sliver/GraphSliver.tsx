import { useState } from "react";
import { Line } from "react-chartjs-2";

interface GraphSliverProps {
  data: { distance: number; velocity: number; time: number }[][];
}

const GraphSliver: React.FC<GraphSliverProps> = ({ data }) => {
  const [distanceChartCar, setDistanceChartCar] = useState(0);
  const [velocityChartCar, setVelocityChartCar] = useState(0);

  const distanceChartIndex = distanceChartCar;
  const velocityChartIndex = velocityChartCar;
  return (
    <>
      <section className="flex flex-col items-center justify-center w-1/2 h-full">
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
      </section>

      <section className="flex flex-col items-center justify-center w-1/2 h-full">
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
      </section>
    </>
  );
};

export default GraphSliver;
