import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../MovieBox';
import styles from './MovieCarousel.module.css';

interface Movie {
  poster_path: string;
  title: string;
  id: number;
}

const MovieCarousel: React.FC = () => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [faves, setFaves] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('faves') || '[]');
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? data!.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === data!.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const toggleFave = (id: number) => {
    const newFaves = faves.includes(id)
      ? faves.filter(faveId => faveId !== id)
      : [...faves, id];
    setFaves(newFaves);
    localStorage.setItem('faves', JSON.stringify(newFaves));
  };

  return (
    <div className={styles.movieCarousel}>
      <button onClick={handlePrev} className={styles.carouselButton}>
        ‹
      </button>
      {data && (
        <MovieBox
          posterPath={data[currentIndex].poster_path}
          title={data[currentIndex].title}
          id={data[currentIndex].id}
          isFave={faves.includes(data[currentIndex].id)}
          toggleFave={() => toggleFave(data[currentIndex].id)}
        />
      )}
      <button onClick={handleNext} className={styles.carouselButton}>
        ›
      </button>
    </div>
  );
};

export default MovieCarousel;
