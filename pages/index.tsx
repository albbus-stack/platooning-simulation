import GraphSliver from "../components/GraphSliver";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { SliverContext } from "../components/SliverProvider";

const P5Canvas = dynamic(() => import("../components/P5Canvas"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState([[]] as {
    distance: number;
    velocity: number;
    time: number;
  }[][]);

  const { height, isSliverOpen, setIsSliverOpen } = useContext(SliverContext);

  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="absolute top-5 left-[4.2rem] text-lg font-mono tracking-wider select-none text-slate-800">
        platooning simulation
      </div>

      <P5Canvas sliverHeight={isSliverOpen ? height : 0} setData={setData} />

      <button
        onClick={() => setIsSliverOpen(true)}
        className="absolute z-10 bottom-0 pb-3 right-[50%] translate-x-[50%] ml-auto bg-slate-800 text-white hover:bg-slate-300 hover:text-slate-800 transition-all duration-300 px-4 py-2 rounded-md rounded-b-none"
      >
        Graphs
      </button>

      <GraphSliver data={data} />
    </div>
  );
}
