import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import InfoIcon from "../components/icons/InfoIcon";
import RotateIcon from "../components/icons/RotateIcon";
import Sliver from "../components/sliver/Sliver";
import { SliverContext } from "../components/sliver/SliverProvider";
import P5Canvas from "../components/P5Canvas"

const Home: NextPage = () => {
  const { setIsSliverOpen, setIsGraphSliver } = useContext(SliverContext);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobilePortrait(
        window.matchMedia("(orientation: portrait)").matches &&
          window.innerWidth < 500
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Platooning Simulation</title>
        <meta
          name="description"
          content="A platooning simulation made using react and p5.js"
        />
      </Head>

      <main className="flex flex-col items-center w-full h-screen overflow-hidden bg-slate-200">
        <nav
          className={
            "absolute flex flex-row gap-4 items-center text-lg tracking-wider select-none top-5 left-[4.5rem] text-slate-800" +
            (isMobilePortrait ? " relative top-0 left-0 mt-10 gap-5 px-5" : "")
          }
        >
          <Link href="/about" className="z-20">
            <div className="p-1 text-white transition-all duration-300 rounded-md cursor-pointer select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800">
              <InfoIcon />
            </div>
          </Link>
          <h1>platooning simulation</h1>
        </nav>

        {isMobilePortrait ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-8 text-lg text-slate-800">
            <RotateIcon />
            <p className="text-lg text-center">
              This simulation is best viewed on a{" "}
              <b className="text-bold">desktop</b> or{" "}
              <b className="text-bold">laptop</b>. <br />
              <br />
              Please rotate your device to{" "}
              <b className="text-bold">landscape mode</b> or visit this site on
              a pc.
            </p>
          </div>
        ) : (
          <>
            <P5Canvas />

            <nav className="absolute bottom-0 z-10 flex flex-row gap-5 translate-x-1/2 right-1/2">
              <button
                onClick={() => {
                  setIsSliverOpen(true);
                  setIsGraphSliver(true);
                }}
                className="px-5 py-2 text-white transition-all duration-300 rounded-md rounded-b-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800 group"
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
                className="px-5 py-2 text-white transition-all duration-300 rounded-md rounded-b-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800 group"
              >
                Settings{" "}
                <span className="text-sm text-gray-300 group-hover:text-slate-500">
                  (S)
                </span>
              </button>
            </nav>

            <Sliver />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
