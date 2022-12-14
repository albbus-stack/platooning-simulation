import GraphSliver from "../components/GraphSliver";
import { useState } from "react";
import useResize from "../hooks/useResize";
import dynamic from "next/dynamic";

const P5Canvas = dynamic(() => import("../components/P5Canvas"), {
  ssr: false,
});

export default function Home() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([{ x: 10, time: 0 }] as {
    x: number;
    time: number;
  }[]);

  const { height, enableResize, setHeightFromSize, size } = useResize({});

  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="absolute top-5 left-5 text-lg font-mono tracking-wider select-none text-slate-800">
        Platooning simulation
      </div>

      <P5Canvas sliverHeight={open ? height : 0} setData={setData} />

      <button
        onClick={() => setOpen(!open)}
        className="absolute z-10 bottom-0 pb-3 right-[50%] translate-x-[50%] ml-auto bg-slate-800 text-white hover:bg-slate-300 hover:text-slate-800 transition-all duration-300 px-4 py-2 rounded-md rounded-b-none"
      >
        Graphs
      </button>

      <GraphSliver
        isOpen={open}
        setOpen={setOpen}
        height={height}
        enableResize={enableResize}
        setSize={setHeightFromSize}
        size={size}
        data={data}
      />
    </div>
  );
}
