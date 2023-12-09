# platooning-visualization

[![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)](https://p5js.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)

## Introduction

This is a simulation web app aimed at visualizing and providing graphs for a [platooning system](https://en.wikipedia.org/wiki/Platoon_(automobile)) with interactive conditions.

You can try this directly on the [live website](https://platooning-visualization.vercel.app).

This has been developed using [Next.js](https://nextjs.org/) for server side rendering, [p5.js](https://p5js.org/) for the simulation canvas itself, [Chart.js](https://www.chartjs.org/) for graph rendering and [Paraglide-js](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for internationalization.

## How to run

1. Run `pnpm install` to install the necessary dependencies.
1. Run `pnpm dev` to start the development server.

## Deploying

You can deploy this project as any Next.js project, using [Netlify](https://www.netlify.com/), [AWS Amplify](https://aws.amazon.com/amplify/) or [Vercel](https://vercel.com/). All the necessary configuration is already handled for you. In our live deployment we currently use the Github integration provided by Vercel, rebuilding the site for every new commit on the main branch. 
