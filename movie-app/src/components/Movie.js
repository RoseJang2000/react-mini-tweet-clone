import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './Movie.css';
import styles from './Movie.module.css';

const Movie = ({ id, coverImg, title, year, summary, genres }) => {
  return (
    <div className={styles.movie}>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} className={styles.movie__img} />
        <div className={styles.movie__content}>
          <div className={styles.movie__title__content}>
            <h2 className={styles.movie__title}>{title}</h2>
            <h3 className={styles.movie__year}>{year}</h3>
          </div>
          <p className={styles.movie__summary}>{summary}</p>
        </div>
      </Link>
      <ul className={styles.movie__genres}>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
};

Movie.propTypes = {
  id: propTypes.number.isRequired,
  coverImg: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  year: propTypes.number.isRequired,
  summary: propTypes.string.isRequired,
  genres: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Movie;
