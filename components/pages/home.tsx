import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import InfoIcon from "../icons/InfoIcon";
import RotateIcon from "../icons/RotateIcon";
import Sliver from "../sliver/Sliver";
import { SliverContext } from "../sliver/SliverProvider";
import P5Canvas from "../P5Canvas";
import * as m from "../../src/paraglide/messages";
import { useMobile } from "../../hooks/useMobile";
import { languageTag } from "../../src/paraglide/runtime";
import LanguageDropdown from "../LanguageDropdown";

const HomePage: NextPage = () => {
  const { setIsSliverOpen, setIsGraphSliver } = useContext(SliverContext);
  const isMobilePortrait = useMobile();
  const lang = languageTag();

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
            "absolute flex w-[calc(100%-6rem)] flex-row gap-4 items-center text-lg tracking-wider select-none top-5 left-[4.5rem] text-slate-800" +
            (isMobilePortrait
              ? " w-full relative flex-col justify-center flex top-0 !left-0 mt-10 gap-5 px-5 self-center"
              : "")
          }
        >
          <Link
            href={lang === "en" ? "/about" : "/" + lang + "/about"}
            className="z-20"
          >
            <div className="p-1 text-white transition-all duration-300 rounded-md cursor-pointer select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800">
              <InfoIcon />
            </div>
          </Link>
          <h1 className="text-center">{m.title()}</h1>
          <LanguageDropdown />
        </nav>

        {isMobilePortrait ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-8 text-lg text-slate-800">
            <RotateIcon />
            <p className="text-lg text-center">
              {m.mobileAlert1()} <b className="text-bold">desktop</b>{" "}
              {m.mobileAlert2()} <b className="text-bold">laptop</b>. <br />
              <br />
              {m.mobileAlert3()} <b className="text-bold">{m.mobileAlert4()}</b>{" "}
              {m.mobileAlert5()}
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
                {m.graphs()}{" "}
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
                {m.settings()}{" "}
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

export default HomePage;
