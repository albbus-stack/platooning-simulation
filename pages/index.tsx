import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import InfoIcon from "../components/icons/InfoIcon";
import Sliver from "../components/sliver/Sliver";
import { SliverContext } from "../components/sliver/SliverProvider";

const P5Canvas = dynamic(() => import("../components/P5Canvas"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { setIsSliverOpen, setIsGraphSliver } = useContext(SliverContext);

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

        <P5Canvas />

        <nav className="absolute bottom-0 z-10 flex flex-row gap-5 translate-x-1/2 right-1/2">
          <button
            onClick={() => {
              setIsSliverOpen(true);
              setIsGraphSliver(true);
            }}
            className="px-4 py-2 text-white transition-all duration-300 rounded-md rounded-b-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800 group"
          >
            Graphs{" "}
            <span className="text-sm text-gray-300 group-hover:text-slate-500">
              (G)
            </span>
          </button>

          <button
            onClick={() => {
              setIsSliverOpen(true);
              setIsGraphSliver(false);
            }}
            className="px-4 py-2 text-white transition-all duration-300 rounded-md rounded-b-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800 group"
          >
            Settings{" "}
            <span className="text-sm text-gray-300 group-hover:text-slate-500">
              (S)
            </span>
          </button>
        </nav>

        <Sliver />
      </main>
    </>
  );
};

export default Home;
