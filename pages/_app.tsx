import type { AppProps } from "next/app";
import { DataProvider } from "../components/DataProvider";
import { SliverProvider } from "../components/sliver/SliverProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <SliverProvider>
        <Component {...pageProps} />
      </SliverProvider>
    </DataProvider>
  );
}
