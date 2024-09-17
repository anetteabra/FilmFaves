import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../MovieBox';
import styles from './MovieCarousel.module.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Movie {
  poster_path: string;
  title: string;
}

const MovieCarousel: React.FC = () => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Create navigate function using useNavigate
  const navigate = useNavigate();

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

  const handleMovieClick = () => { // later: (movie: Movie) =>d
    // Use navigate to go to the movie details page
    navigate('/movie'); // No ID or other dynamic params
  };

  return (
    <div className={styles.movieCarousel}>
      <button onClick={handlePrev} className={styles.carouselButton}>
        ‹
      </button>
      <MovieBox
        posterPath={data![currentIndex].poster_path}
        title={data![currentIndex].title}
        onClick={handleMovieClick} // Pass the onClick - later: handleMovieClick(data![currentIndex])
      />
      <button onClick={handleNext} className={styles.carouselButton}>
        ›
      </button>
    </div>
  );
};

export default MovieCarousel;
