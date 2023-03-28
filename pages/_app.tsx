import type { AppProps } from "next/app";
import { SliverProvider } from "../components/sliver/SliverProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SliverProvider>
      <Component {...pageProps} />
    </SliverProvider>
  );
}
