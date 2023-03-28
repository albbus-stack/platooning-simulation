import React, { useContext } from "react";
import GraphSliver from "./GraphSliver";
import SettingsSliver from "./SettingsSliver";
import SliverButton from "./SliverButton";
import { SliverContext } from "./SliverProvider";
import XMark from "../icons/XMark";

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

  return (
    <aside
      style={{
        height: height,
        transform: isSliverOpen ? "translateY(0)" : "translateY(100%)",
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
            <button
              className="flex items-center justify-center w-10 pt-[.1rem] font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 hover:text-slate-500 hover:bg-slate-300"
              onClick={() => setIsSliverOpen(false)}
            >
              <XMark />
            </button>
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
