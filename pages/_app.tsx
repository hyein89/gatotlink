import type { AppProps } from "next/app";
import "@/../public/custom.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
