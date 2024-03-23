import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HomeIcon from "../icons/HomeIcon";
import * as m from "../../src/paraglide/messages";
import { languageTag } from "../../src/paraglide/runtime";

const AboutPage: NextPage = () => {
  const lang = languageTag();

  return (
    <>
      <Head>
        <title>Platooning Simulation | About</title>
        <meta
          name="description"
          content="The about page for this platooning simulation project"
        />
        <meta name="language" content={lang} />
      </Head>

      <main className="w-full bg-slate-200">
        <nav className="flex flex-row items-center w-full gap-4 p-5 text-lg tracking-wider select-none text-slate-800">
          <Link href={lang === "en" ? "/" : "/" + lang} className="z-20">
            <div className="p-[0.4rem] text-white transition-all duration-300 rounded-md cursor-pointer select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800">
              <HomeIcon />
            </div>
          </Link>
          <h1>{m.aboutTitle()}</h1>
        </nav>

        <section
          className={
            "flex flex-col gap-5 px-10 pt-8 pb-16 md:px-16 " +
            (lang === "sa" ? "text-right" : "")
          }
        >
          <h1 className="text-2xl font-bold text-slate-800">
            {m.whatIsThis()}
          </h1>
          <p className="text-lg text-slate-800">{m.whatIsThisParagraph()}</p>

          <h1 className="text-2xl font-bold text-slate-800">
            {m.whatIsPlatooning()}
          </h1>
          <p className="text-lg text-slate-800">
            {m.whatIsPlatooningParagraph()}
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            {m.howSimulationWorks()}
          </h1>
          <p className="text-lg text-slate-800">
            {m.howSimulationWorksParagraph()}
          </p>

          <h1 className="text-2xl font-bold text-slate-800">{m.howToUse()}</h1>
          <p className="text-lg text-slate-800">{m.howToUseParagraph()}</p>

          <h1 className="text-2xl font-bold text-slate-800">
            {m.howSettings()}
          </h1>
          <p className="text-lg text-slate-800">{m.howSettingsParagraph()}</p>
          <h1 className="mt-2 text-2xl font-bold">{m.thesis()}</h1>
          <embed
            src="/pdf/thesis.pdf"
            type="application/pdf"
            width="100%"
            height="700px"
            className="mb-5"
          />
          <h1 className="text-2xl font-bold">{m.presentation()}</h1>
          <embed
            src="/pdf/presentation.pdf"
            type="application/pdf"
            width="100%"
            height="700px"
          />
        </section>
      </main>
    </>
  );
};

export default AboutPage;
