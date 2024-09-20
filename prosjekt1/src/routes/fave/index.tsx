import styles from './fave.module.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi'; // API-funksjonen for å hente filmer
import MovieBox from '../../components/MovieBox'; // Komponent for å vise filmene

interface Movie {
  posterPath: string;
  title: string;
  id: number;
  voteAverage: number;
}

const Fave: React.FC = () => {
  //Fetches fave movie id from localStorage
  const [faves, setFaves] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('faves') || '[]');
  });

  // React Query for fetching movie data 
  const { data: movies, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  // Function to toggle favorite status
  const toggleFave = (id: number) => {
    setFaves((prevFaves) => {
      const isFave = prevFaves.includes(id);
      if (isFave) {
        return prevFaves.filter((faveId) => faveId !== id);
      } else {
        return [...prevFaves, id];
      }
    });
  };

  // Filtrere filmer basert på favoritt-ID-er
  const favoriteMovies = movies?.filter((movie) => faves.includes(movie.id));

  if (isLoading) {
    return <div>Loading fave movies...</div>;
  }

  if (isError) {
    return <div>An error occured while loading movies.</div>;
  }

  if (favoriteMovies?.length === 0) {
    return <div>No fave movies found</div>;
  }
  
  return (
    <div className={styles.controls}>
      <h2>Your favoritt movies</h2>
      <div className={styles.setList}
      id="favoriteMovieList">
        {favoriteMovies?.map((movie) => (
        <MovieBox
            key={movie.id}
            posterPath={movie.posterPath}
            title={movie.title}
            id={movie.id}
            toggleFave={() => toggleFave(movie.id)}
            isFave={true} // Fordi dette er en liste over favoritter
            faves={faves}
            setFaves={setFaves}
            voteAverage={movie.voteAverage}
          />
        ))}
      </div>
    </div>
  );
};

export default Fave;