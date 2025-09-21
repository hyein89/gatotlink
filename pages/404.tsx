import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - 404</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center p-6">
        {/* Big 404 with animation */}
        <h1 className="text-9xl font-extrabold animate-bounce">404</h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold">
          Oops! Page not found
        </p>
        <p className="mt-2 text-lg md:text-xl opacity-90">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button back */}
        <Link
          href="/"
          className="mt-8 inline-block bg-white text-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transform transition"
        >
          Go Back Home
        </Link>

        {/* Animated background circles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-2xl animate-ping bottom-10 right-10"></div>
        </div>
      </main>
    </>
  );
}
