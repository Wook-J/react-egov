import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genres }) {

  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} className="movie-card__thumb" />
      </Link>
      <div className="movie-card__body">
        <h2 className="movie-card__title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <ul className="movie-card__genres">
          {genres?.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="movie-card__summary">{summary}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default Movie;
