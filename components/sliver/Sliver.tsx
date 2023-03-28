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
import React, { useContext } from "react";
import GraphSliver from "./GraphSliver";
import SettingsSliver from "./SettingsSliver";
import SliverButton from "./SliverButton";
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

interface SliverProps {
  data: { distance: number; velocity: number; time: number }[][];
  carNumber: number;
  setCarNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Sliver: React.FC<SliverProps> = ({ data, carNumber, setCarNumber }) => {
  const {
    height,
    enableResize,
    setHeightFromSize,
    size,
    isSliverOpen,
    setIsSliverOpen,
    isGraphSliver,
  } = useContext(SliverContext);

  return (
    <aside
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
          />
          <nav className="absolute z-30 top-[-2.2rem] px-3 left-0 w-full flex flex-row justify-between select-none">
            <div>
              <SliverButton
                size={size}
                label="S"
                onClick={() => {
                  setHeightFromSize("S");
                }}
              />

              <SliverButton
                size={size}
                label="M"
                onClick={() => {
                  setHeightFromSize("M");
                }}
              />

              <SliverButton
                size={size}
                label="L"
                onClick={() => {
                  setHeightFromSize("L");
                }}
              />
            </div>
            <button
              className="w-10 p-1 pb-1 mr-2 font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 hover:text-slate-500 hover:bg-slate-300"
              onClick={() => setIsSliverOpen(false)}
            >
              ✕
            </button>
          </nav>
        </>
      )}

      <main className="flex flex-row justify-between w-full h-full">
        {isGraphSliver ? (
          <GraphSliver data={data} />
        ) : (
          <SettingsSliver carNumber={carNumber} setCarNumber={setCarNumber} />
        )}
      </main>
    </aside>
  );
};

export default Sliver;