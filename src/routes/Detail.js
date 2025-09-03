import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Detail.css";

function Detail() {
  const publicUrl = process.env.PUBLIC_URL || '';

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const json = await res.json();
      setMovie(json?.data?.movie || null);
    } catch (e) {
      console.error(e);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMovie();
    // id가 바뀌면 다시 불러오기
  }, [id]);

  if (loading) {
    return (
      <div className="detail">
        <div className="detail__loading">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="detail">
        <div className="detail__loading">No data found.</div>
      </div>
    );
  }

  return (
    <div className="detail">
      {/* 히어로 배경 */}
      <div
        className="detail__hero"
        style={{
          backgroundImage: `url(${
            movie.background_image_original || movie.background_image
          })`,
        }}
      >
        <div className="detail__overlay" />
        <Link to={`${publicUrl}/`} className="btn btn--home">← Home</Link>
        <div className="detail__heroContent">
          <img
            className="detail__poster"
            src={movie.large_cover_image || movie.medium_cover_image}
            alt={movie.title}
          />

          <div className="detail__meta">
            <h1 className="detail__title">
              {movie.title_long || movie.title}
            </h1>

            <div className="detail__sub">
              {movie.year && <span>{movie.year}</span>}
              <span>·</span>
              <span>{movie.runtime ? `${movie.runtime} min` : "—"}</span>
              <span>·</span>
              <span>⭐ {movie.rating ?? "-"}</span>
              {movie.language && (
                <>
                  <span>·</span>
                  <span className="detail__lang">
                    {movie.language.toUpperCase()}
                  </span>
                </>
              )}
            </div>

            {Array.isArray(movie.genres) && movie.genres.length > 0 && (
              <ul className="detail__genres">
                {movie.genres.map((g) => (
                  <li key={g} className="detail__genre">
                    {g}
                  </li>
                ))}
              </ul>
            )}

            <div className="detail__actions">
              {movie.url && (
                <a
                  className="btn"
                  href={movie.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  YTS Page
                </a>
              )}
              {movie.yt_trailer_code && (
                <a
                  className="btn btn--ghost"
                  href={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <section className="detail__section">
        <h2 className="section__title">Overview</h2>
        <p className="detail__desc">
          {movie.description_full?.trim() ||
            movie.description_intro?.trim() ||
            "No description provided."}
        </p>
      </section>

      {/* 토렌트 테이블 */}
      {Array.isArray(movie.torrents) && movie.torrents.length > 0 && (
        <section className="detail__section">
          <h2 className="section__title">Available Torrents</h2>
          <div className="table">
            <div className="table__row table__row--head">
              <div>Quality</div>
              <div>Type</div>
              <div>Size</div>
              <div>Seeds</div>
              <div>Peers</div>
              <div>Uploaded</div>
              <div>Download</div>
            </div>

            {movie.torrents.map((t) => (
              <div key={t.hash} className="table__row">
                <div>{t.quality}</div>
                <div>{t.type}</div>
                <div>{t.size}</div>
                <div>{t.seeds}</div>
                <div>{t.peers}</div>
                <div>{t.date_uploaded?.split(" ")[0]}</div>
                <div>
                  <a className="link" href={t.url} target="_blank" rel="noreferrer">
                    Get .torrent
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Detail;
