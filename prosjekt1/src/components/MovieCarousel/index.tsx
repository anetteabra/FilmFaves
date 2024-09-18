import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../MovieBox';
import styles from './MovieCarousel.module.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Movie {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;
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

  const toggleFave = (id: number) => {
    const newFaves = faves.includes(id)
      ? faves.filter(faveId => faveId !== id)
      : [...faves, id];
    setFaves(newFaves);
    localStorage.setItem('faves', JSON.stringify(newFaves));
  };

  const handleMovieClick = (movie: Movie) => { // 
    // Use navigate to go to the movie details page
    navigate(`/movie/${movie.id}`); 
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
          voteAverage={data![currentIndex].vote_average}
          onClick={() => handleMovieClick(data![currentIndex])} // Pass the onClick
      />
      )}
      <button onClick={handleNext} className={styles.carouselButton}>
        ›
      </button>
    </div>
  );
};

export default MovieCarousel;
