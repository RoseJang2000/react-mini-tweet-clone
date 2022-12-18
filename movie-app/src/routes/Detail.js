import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { FaCloudDownloadAlt, FaRegHeart, FaStar } from 'react-icons/fa';

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <img
            id="background"
            src={movie.background_image_original}
            alt={`background image of ${movie.title}`}
          />
          <img id="cover" src={movie.large_cover_image} alt={`cover of ${movie.title}`} />
          <div>
            <div className="movie_title">
              <h1>{movie.title_long}</h1>
              <span>
                <FaStar /> {movie.rating}
              </span>
            </div>
            <div className="movie_user-likes">
              <span>
                <FaCloudDownloadAlt /> {movie.download_count}
              </span>
              <span>
                <FaRegHeart /> {movie.like_count}
              </span>
            </div>
            <div className="movie_content">
              <h4>Runtime - {movie.runtime}m</h4>
              <p>{movie.description_full}</p>
            </div>
            <ul className="movie_tags">
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
