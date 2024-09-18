import styles from './MovieBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

interface MovieBoxProps {
  posterPath: string;
  title: string;
  id: number;
  isFave: boolean;
  toggleFave: () => void;
  voteAverage: number;
  onClick?: () => void;
}

const MovieBox: React.FC<MovieBoxProps> = ({
  posterPath,
  title, 
  onClick,
  isFave,
  toggleFave,
  voteAverage,
}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }} className={styles.movieBox}>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className={styles.moviePoster}
      />
      {/* <h2 className={styles.movieTitle}>{title}</h2> */}
      <h2 className={styles.movieTitle}>Rating: {voteAverage.toFixed(1)}/10</h2>
      <span onClick={toggleFave}>
        <FontAwesomeIcon
          icon={isFave ? solidHeart : regularHeart}
          className={`${styles.heart} ${isFave ? styles.fave : styles.notFave}`}
        />
      </span>
    </div>
  );
};

export default MovieBox;
