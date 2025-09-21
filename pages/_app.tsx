import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/404.css"; // tambahkan ini
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/custom.css" /> {/* load dari /public */}
      </Head>

      
      {/* Histats Tracking Code */}
      <Script id="histats-script" strategy="afterInteractive">
        {`
          var _Hasync = _Hasync || [];
          _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00000000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
            var hs = document.createElement('script'); 
            hs.type = 'text/javascript'; 
            hs.async = true;
            hs.src = ('//s10.histats.com/js15_as.js');
            (document.getElementsByTagName('head')[0] || 
             document.getElementsByTagName('body')[0]).appendChild(hs);
          })();
        `}
      </Script>
      
      <Component {...pageProps} />
    </>
  );
}


