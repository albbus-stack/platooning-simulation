import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HomeIcon from "../components/icons/HomeIcon";

const About: NextPage = () => (
  <>
    <Head>
      <title>Platooning Simulation | About</title>
      <meta
        name="description"
        content="The about page for this platooning simulation project"
      />
    </Head>

    <main className="w-full bg-slate-200">
      <nav className="flex flex-row items-center gap-4 p-5 text-lg tracking-wider select-none text-slate-800">
        <Link href="/" className="z-20">
          <div className="p-[0.4rem] text-white transition-all duration-300 rounded-md cursor-pointer select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800">
            <HomeIcon />
          </div>
        </Link>
        <h1>about this project</h1>
      </nav>

      <section className="flex flex-col gap-5 px-16 pt-8 pb-16">
        <h1 className="text-2xl font-bold text-slate-800">What is this?</h1>
        <p className="text-lg text-slate-800">
          This is a platooning simulation made using react and p5.js
        </p>

        <h1 className="text-2xl font-bold text-slate-800">
          What is platooning?
        </h1>
        <p className="text-lg text-slate-800">
          Platooning is a method of driving where a group of vehicles drive in a
          line, with the vehicles in the front of the line controlling the speed
          of the vehicles behind them. This is done to reduce fuel consumption
          and increase safety.
        </p>

        <h1 className="text-2xl font-bold text-slate-800">
          How does this simulation work?
        </h1>
        <p className="text-lg text-slate-800">
          This simulation uses a simple model of platooning to simulate the
          vehicles. The vehicles are controlled by a PID controller, which uses
          the distance between the vehicle and the vehicle in front of it to
          calculate the speed of the vehicle. The PID controller is tuned to
          give the vehicles a comfortable distance between them, and to keep the
          vehicles at a constant speed.
        </p>

        <h1 className="text-2xl font-bold text-slate-800">
          How do I use this?
        </h1>
        <p className="text-lg text-slate-800">
          You can use this by clicking the Graphs button at the bottom of the
          screen. This will open a sliver at the bottom of the screen, which
          will show you the graphs of the simulation. You can close the sliver
          by clicking the Graphs button again.
        </p>

        <h1 className="text-2xl font-bold text-slate-800">
          How do I change the settings?
        </h1>
        <p className="text-lg text-slate-800">
          You can change the settings by clicking the Settings button at the
          bottom of the screen. This will open a sliver at the bottom of the
          screen, which will show you the settings of the simulation. You can
          close the sliver by clicking the Settings button again.
        </p>
      </section>
    </main>
  </>
);

export default About;
