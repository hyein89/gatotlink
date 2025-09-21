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
  video: VideoData;
};

export default function VideoPage({ video }: Props) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const iframeUrl = process.env.NEXT_PUBLIC_IFRAME_URL || "";
  // Timer countdown
  useEffect(() => {
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
  }, []);

  return (
    <>
      <Head>

  <title>{video.title}</title>
  <meta name="description" content={`Landing page for ${video.title}`} />

  {/* Open Graph (Facebook, WhatsApp) */}
  <meta property="og:title" content={video.title} />
  <meta property="og:image" content={video.url_image} />
  <meta property="og:url" content={`https://gatotlink.vercel.app/${video.id}`} />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={video.title} />
  <meta name="twitter:image" content={video.url_image} />

  <link rel="icon" href="/xxlove.png" />
</Head>


      {/* Navbar */}
      <div className="navbar">
        <div className="brand">
          <img
            className="logo"
            src={video.url_image}
            alt={video.title}
          />
          <div className="site-name">{video.title}</div>
        </div>
        <div className="controls">
          {!showSkip ? (
            <div id="timer" className="timer">
              Please Wait... {timeLeft}s
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

      {/* Content */}
      <div className="content">
        <iframe
          src={iframeUrl}
          width="100%"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>

      {/* third-party script */}
      <script
        type="text/javascript"
        src="//difficultywithhold.com/03/49/28/03492842c401b23d7f49f47efafa0f88.js"
      ></script>
    </>
  );
}

/**
 * Generate semua path berdasarkan data.json
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const videos: VideoData[] = JSON.parse(fileData);

  const paths = videos.map((v) => ({ params: { id: v.id } }));

  return { paths, fallback: "blocking" }; // pakai blocking biar 404 bisa jalan
};

/**
 * Ambil data untuk id tertentu
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "data.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const videos: VideoData[] = JSON.parse(fileData);

  const video = videos.find((v) => v.id === params?.id);

  if (!video) {
    return { notFound: true }; // ✅ redirect otomatis ke 404.tsx
  }

  return { props: { video } };
};
