import React, { useContext } from "react";
import GraphSliver from "./GraphSliver";
import SettingsSliver from "./SettingsSliver";
import SliverButton from "./SliverButton";
import { SliverContext } from "./SliverProvider";
import XIcon from "../icons/XIcon";
import DownloadIcon from "../icons/DownloadIcon";
import { DataContext } from "../DataProvider";

const Sliver: React.FC = () => {
  const {
    height,
    enableResize,
    setHeightFromSize,
    size,
    isSliverOpen,
    setIsSliverOpen,
    isGraphSliver,
  } = useContext(SliverContext);

  const { graphData } = useContext(DataContext);

  const downloadGraphDataCSV = () => {
    let csvContent =
      "data:text/csv;charset=utf-8," +
      "car,time(s),distance(m),velocity(m/s)\n";

    graphData.forEach((car, carIndex) => {
      car.forEach((dataPoint) => {
        const { time, distance, velocity } = dataPoint;
        csvContent += `${carIndex},${time},${distance},${velocity}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "graphData.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <aside
      style={{
        height: height,
        transform: isSliverOpen ? "translateY(0)" : "translateY(100%)",
        opacity: isSliverOpen ? 1 : 0,
      }}
      className="fixed bottom-0 left-0 z-30 flex flex-col justify-center w-full p-4 border-t-2 border-black bg-slate-300 align-center"
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
            <div className="flex flex-row gap-5">
              {isGraphSliver && (
                <div className="relative group/btn">
                  <div className="top-[-100%] -translate-y-[60%] left-[50%] translate-x-[-50%] w-20 text-center hidden z-20 group-hover/btn:inline-block absolute px-3 py-2 text-sm font-medium text-white duration-300 rounded-lg shadow-sm opacity-80 bg-gray-700">
                    <span className="">Download CSV</span>
                    <div className="absolute bottom-[-3px] left-[50%] -translate-x-[50%] w-5 h-5 rotate-45 bg-gray-700 z-[-1]" />
                  </div>
                  <button
                    className="flex items-center justify-center bg-[#e2e8ff] w-10 h-full pt-[.1rem] font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 group-hover/btn:text-slate-500 group-hover/btn:bg-slate-300"
                    onClick={() => downloadGraphDataCSV()}
                  >
                    <DownloadIcon />
                  </button>
                </div>
              )}
              <button
                className="flex items-center justify-center bg-[#e2e8ff] w-10 pt-[.1rem] font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 hover:text-slate-500 hover:bg-slate-300"
                onClick={() => setIsSliverOpen(false)}
              >
                <XIcon />
              </button>
            </div>
          </nav>
        </>
      )}

      <main className="flex flex-row justify-between w-full h-full">
        {isGraphSliver ? <GraphSliver /> : <SettingsSliver />}
      </main>
    </aside>
  );
};

export default Sliver;
