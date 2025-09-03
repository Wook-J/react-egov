import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import "../css/Home.css";

function Home(){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      );
      const json = await res.json();
      setMovies(json?.data?.movies || []);
    } catch (e) {
      console.error(e);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies()
  }, []);

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Movies</h1>
        <p className="home__subtitle">Pick a title to see the details</p>
      </div>

      {loading ? (
        <div className="home__grid">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="home__grid">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              coverImg={movie.medium_cover_image}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;