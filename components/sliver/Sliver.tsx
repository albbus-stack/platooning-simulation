import React, { useContext, useEffect } from "react";
import GraphSliver from "./GraphSliver";
import SettingsSliver from "./SettingsSliver";
import SliverButton from "./SliverButton";
import { SliverContext } from "./SliverProvider";
import XIcon from "../icons/XIcon";
import DownloadIcon from "../icons/DownloadIcon";
import { DataContext } from "../DataProvider";
import * as m from "../../src/paraglide/messages";
import SettingsIcon from "../icons/SettingsIcon";
import GraphsIcon from "../icons/GraphsIcon";
import SliverIconButton from "./SliverIconButton";

const Sliver: React.FC = () => {
  const {
    height,
    enableResize,
    setHeightFromSize,
    size,
    isSliverOpen,
    setIsSliverOpen,
    setIsGraphSliver,
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

  // This effect takes care of the graph/settings sliver keyboard shourtcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "g") {
        // Open the graph sliver
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
        // Open the setting sliver
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
    };
  }, [setIsSliverOpen, setIsGraphSliver, isGraphSliver]);

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
                <SliverIconButton
                  label="Download CSV"
                  icon={<DownloadIcon />}
                  onClick={() => downloadGraphDataCSV()}
                />
              )}
              {isGraphSliver ? (
                <SliverIconButton
                  label={m.settings()}
                  icon={<SettingsIcon />}
                  onClick={() => setIsGraphSliver((prev) => !prev)}
                />
              ) : (
                <SliverIconButton
                  label={m.graphs()}
                  icon={<GraphsIcon />}
                  onClick={() => setIsGraphSliver((prev) => !prev)}
                />
              )}
              <SliverIconButton
                icon={<XIcon />}
                onClick={() => setIsSliverOpen(false)}
              />
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
