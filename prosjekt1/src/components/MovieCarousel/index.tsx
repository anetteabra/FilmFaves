import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../MovieBox';
import styles from './MovieCarousel.module.css';
import { useNavigate } from 'react-router-dom';

interface Movie {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;
}

interface MovieCarouselProps {
  sortOption: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ sortOption }) => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [faves, setFaves] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('faves') || '[]');
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const sortedMovies =
        sortOption === 'rating'
          ? [...data].sort((a, b) => b.vote_average - a.vote_average)
          : data;
      setSortedMovies(sortedMovies);
    }
  }, [sortOption, data]);

  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? sortedMovies.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === sortedMovies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const toggleFave = (id: number) => {
    const newFaves = faves.includes(id)
      ? faves.filter(faveId => faveId !== id)
      : [...faves, id];
    setFaves(newFaves);
    localStorage.setItem('faves', JSON.stringify(newFaves));
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading movies</div>}
      {sortOption === 'carousel' && sortedMovies.length > 0 && (
        <div className={styles.movieCarousel}>
          <button onClick={handlePrev} className={styles.carouselButton}>
            ‹
          </button>
          <MovieBox
            posterPath={sortedMovies[currentIndex].poster_path}
            title={sortedMovies[currentIndex].title}
            id={sortedMovies[currentIndex].id}
            isFave={faves.includes(sortedMovies[currentIndex].id)}
            toggleFave={() => toggleFave(sortedMovies[currentIndex].id)}
            voteAverage={sortedMovies[currentIndex].vote_average}
            onClick={() => handleMovieClick(sortedMovies[currentIndex])}
          />
          <button onClick={handleNext} className={styles.carouselButton}>
            ›
          </button>
        </div>
      )}
      {sortOption === 'rating' && (
        <div className={styles.movieList}>
          {sortedMovies.map(movie => (
            <MovieBox
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              id={movie.id}
              isFave={faves.includes(movie.id)}
              toggleFave={() => toggleFave(movie.id)}
              voteAverage={movie.vote_average}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieCarousel;
