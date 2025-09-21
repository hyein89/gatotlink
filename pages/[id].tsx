import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";

type VideoData = {
  id: string;
  title: string;
  url_image: string;
  url_offer: string;
};

type Props = {
  video?: VideoData;
};

export default function VideoPage({ video }: Props) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (!video) return;
    let elapsed = 0;
    const total = 10;
    const interval = setInterval(() => {
      elapsed++;
      const left = total - elapsed;
      if (left > 0) {
        setTimeLeft(left);
        setProgress((elapsed / total) * 100);
      } else {
        clearInterval(interval);
        setTimeLeft(0);
        setProgress(100);
        setShowSkip(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [video]);

  if (!video) {
    return (
      <main className="flex h-screen items-center justify-center">
        <h1>404 - Data Tidak Ditemukan</h1>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={`Halaman untuk ${video.title}`} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content="Klik untuk melihat offer" />
        <meta property="og:image" content={video.url_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://gatotlink.vercel.app/${video.id}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content="Klik untuk melihat offer" />
        <meta name="twitter:image" content={video.url_image} />
      </Head>

      <div className="navbar">
        <div className="brand">
          <img
            className="logo"
            src="https://miro.medium.com/v2/resize:fit:1400/0*Ti3br8-2vKRXS1Pn.jpg"
            alt="Logo"
          />
          <div className="site-name">Site Name</div>
        </div>
        <div className="controls">
          {!showSkip ? (
            <div id="timer" className="timer">
              Menunggu {timeLeft}s
            </div>
          ) : null}
          <button
            id="skipBtn"
            className={`skip-btn ${showSkip ? "show" : ""}`}
            onClick={() => (window.location.href = video.url_offer)}
          >
            Skip Ad
          </button>
        </div>
        <div className="progress">
          <div
            id="progressBar"
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="content">
        <iframe
          src="https://back-cast-fly-co.myfreesites.net/"
          width="100%"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>

      {/* script pihak ketiga */}
      <script
        type="text/javascript"
        src="//difficultywithhold.com/03/49/28/03492842c401b23d7f49f47efafa0f88.js"
      ></script>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const videos: VideoData[] = JSON.parse(fileData);

  const paths = videos.map((v) => ({ params: { id: v.id } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const videos: VideoData[] = JSON.parse(fileData);

  const video = videos.find((v) => v.id === params?.id);

  return { props: { video: video || null } };
};
