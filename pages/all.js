// pages/all.js
import Head from "next/head";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";

export default function All() {
  const { data, loading, error } = useFetchData("/api/getmovies");

  // Filter only published movies
  const publishedData = data.filter((movie) => movie.status === "publish");

  // Optional: Show error state
  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load movies. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>All Animes & Series</title>
        <meta name="description" content="Browse all published animes and series" />
      </Head>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .genrenamesec10 {
          text-align: center;
          color: white;
          padding: 20px 0;
        }

        .genremoviesec10 {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding: 20px;
          margin-top: -10px;
        }

        .genremovie10 {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        .mcard10 {
          width: 100%;
          max-width: 180px;
          border-radius: 3px;
          overflow: hidden;
          transition: transform 0.3s ease;
          background: #111;
        }

        .mcard10:hover {
          transform: translateY(-5px);
        }

        .mcard10 a {
          text-decoration: none;
          color: white;
          display: block;
        }

        .cardimg10 img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .contents {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 8px;
          background: #1a1a1a;
        }

        .contents h5 {
          margin: 0;
          font-weight: 400;
          font-size: 15px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .contents h5 span {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: lighter;
          margin-left: 10px;
          white-space: nowrap;
        }

        /* Mobile: 3 cards per row */
        @media (max-width: 600px) {
          .genremovie10 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .mcard10 {
            max-width: 100%;
          }
        }
      `}</style>

      {/* ===== HEADER ===== */}
      <section className="genrenamesec10">
        <div className="logo3">
          <p>All Content</p>
        </div>
      </section>

      {/* ===== MOVIE GRID ===== */}
      <section className="genremoviesec10">
        <div className="genremovie10">
          {loading ? (
            <Spinner />
          ) : publishedData.length === 0 ? (
            <p className="text-gray-400 text-center w-full py-10">
              No published movies found.
            </p>
          ) : (
            publishedData.map((movie) => (
              <div className="mcard10" key={movie.slug}>
                <Link href={`/movies/${movie.slug}`}>
                  <div className="cardimg10">
                    <img
                      src={movie.smposter}
                      alt={movie.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="contents">
                    <h5>
                      {movie.title}
                      <span>{movie.type || "Movie"}</span>
                    </h5>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
