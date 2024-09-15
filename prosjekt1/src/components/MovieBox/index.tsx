import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviePoster } from '../../api/tmdbApi';
import { useParams } from 'react-router-dom';
import styles from './MovieBox.module.css';

interface MovieBoxProps {
    movieId: number;
    }

const MovieBox: React.FC<MovieBoxProps> = ({ movieId }) => {
  useParams<{ id: string; }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ['moviePoster', movieId],
    queryFn: () => fetchMoviePoster(movieId)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie poster</div>;

  return (
    <div className={styles.movieBox}>
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}
      className={styles.moviePoster} />
      <h2 className={styles.movieTitle}>{data.title}</h2>
    </div>
  );
};

export default MovieBox;