interface Movie {
  id: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  runtime: number;
}

// Define the structure of the results array
interface MoviesResponse {
  results: Movie[];
}

test('should fetch "Deadpool & Wolverine" movie data from mock', async () => {
  const mockMovies: MoviesResponse = require('./movies.json'); // Import mocking data

  // Find the movie in mock data
  const deadpoolMovie = mockMovies.results.find(
    (movie: Movie) => movie.title === 'Deadpool & Wolverine',
  );

  expect(deadpoolMovie).toBeDefined(); // Movie is found in mock data
  expect(deadpoolMovie?.title).toBe('Deadpool & Wolverine'); // Ensure it's the correct movie
});
