import type { AppProps } from "next/app";
import "../styles/custom.css"; // ✅ benar
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

