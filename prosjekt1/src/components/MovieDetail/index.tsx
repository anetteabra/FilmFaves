import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi'; // Import the function that fetches all movies
import styles from './MovieDetail.module.css';

interface Movie {
  id: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number; // Use vote_average for rating
  genre_ids: number[]; // Adjusted for genre IDs; you might need to fetch genre names separately
  runtime: number; // Adjusted for runtime (duration)
}

// Mock genre names (You can replace this with a more dynamic approach)
const genreNames: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  // Add more genre IDs and names as needed
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the movie ID from the URL

  // Fetch all movies
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  // Find the specific movie by ID
  const movie = data?.find(movie => movie.id.toString() === id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;
  if (!movie) return <div>Movie not found</div>;

  // Convert genre IDs to names
  const genres = movie.genre_ids
    .map(id => genreNames[id] || 'Unknown')
    .join(', ');

  // Display movie details
  return (
    <div className={styles.divdetails}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.moviePoster}
      />
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Genres:</strong> {genres}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetail;
