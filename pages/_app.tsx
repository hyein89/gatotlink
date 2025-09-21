import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/404.css"; // tambahkan ini
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/custom.css" /> {/* load dari /public */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}


