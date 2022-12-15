import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SliverProvider } from "../components/SliverProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SliverProvider>
      <Component {...pageProps} />
    </SliverProvider>
  );
}
