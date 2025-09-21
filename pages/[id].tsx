import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";

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
  if (!video) {
    return (
      <main className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-bold">404 - Data Tidak Ditemukan</h1>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={`Halaman untuk ${video.title}`} />
        <meta property="og:title" content={video.title} />
        <meta property="og:image" content={video.url_image} />
        <meta property="og:description" content="Klik untuk melihat offer" />
      </Head>
      <main className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
        <img
          src={video.url_image}
          alt={video.title}
          className="rounded shadow-md mb-4"
        />
        <a
          href={video.url_offer}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lihat Offer
        </a>
      </main>
    </>
  );
}

// generate path berdasarkan data.json
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
