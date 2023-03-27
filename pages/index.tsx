import GraphSliver from "../components/GraphSliver";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { SliverContext } from "../components/SliverProvider";
import Head from "next/head";
import Link from "next/link";
import InfoIcon from "../components/icons/InfoIcon";
import { NextPage } from "next";

const P5Canvas = dynamic(() => import("../components/P5Canvas"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [data, setData] = useState([[]] as {
    distance: number;
    velocity: number;
    time: number;
  }[][]);

  const { height, isSliverOpen, setIsSliverOpen } = useContext(SliverContext);

  return (
    <>
      <Head>
        <title>Platooning Simulation</title>
        <meta
          name="description"
          content="A platooning simulation made using react and p5.js"
        />
      </Head>

      <main className="w-full h-screen overflow-hidden bg-slate-200">
        <nav className="absolute flex flex-row gap-4 items-center text-lg tracking-wider select-none top-5 left-[4.5rem] text-slate-800">
          <Link href="/about" className="z-20">
            <div className="p-1 text-white transition-all duration-300 rounded-md cursor-pointer select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800">
              <InfoIcon />
            </div>
          </Link>
          <h1>platooning simulation</h1>
        </nav>

        <P5Canvas sliverHeight={isSliverOpen ? height : 0} setData={setData} />

        <button
          onClick={() => setIsSliverOpen(true)}
          className="absolute z-10 bottom-0 pb-3 right-[50%] translate-x-[50%] ml-auto bg-slate-800 text-white hover:bg-slate-300 hover:text-slate-800 transition-all duration-300 px-4 py-2 rounded-md rounded-b-none"
        >
          Graphs
        </button>

        <GraphSliver data={data} />
      </main>
    </>
  );
};

export default Home;
