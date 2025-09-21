import Link from "next/link";
import Head from "next/head";
import "../styles/404.css"; // import CSS khusus 404

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <main className="notfound-container">
        <div className="notfound-content">
          <h1 className="notfound-title">404</h1>
          <p className="notfound-subtitle">Oops! Page not found</p>
          <p className="notfound-text">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link href="/" className="notfound-button">
            Go Back Home
          </Link>
        </div>

        {/* Animated background */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </main>
    </>
  );
}
