import React from 'react';
//import { useQuery } from '@tanstack/react-query';
//import { fetchMovies } from '../../api/tmdbApi';
//import { useParams } from 'react-router-dom';
import styles from './MovieBox.module.css';


interface MovieBoxProps {
  posterPath: string;
  title: string;
  onClick?: () => void;
}

const MovieBox: React.FC<MovieBoxProps> = ({ posterPath, title, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }} className={styles.movieBox}>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className={styles.moviePoster}
      />
      <h2 className={styles.movieTitle}>{title}</h2>
    </div>
  );
};

export default MovieBox;
