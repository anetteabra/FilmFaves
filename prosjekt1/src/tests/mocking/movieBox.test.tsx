import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import MovieBox from '../../components/MovieBox';
import movies from './movies.json';

describe('MovieBox Component', () => {
  const movie = movies.results[0]; // Using the first movie from the mock data

  const defaultProps = {
    posterPath: movie.poster_path,
    title: movie.title,
    id: movie.id,
    isFave: false,
    toggleFave: vi.fn(),
    voteAverage: movie.vote_average,
    onClick: vi.fn(),
  };

  it('renders movie poster and rating', () => {
    render(<MovieBox {...defaultProps} />);

    const poster = screen.getByAltText(movie.title);
    const rating = screen.getByText(
      `Rating: ${movie.vote_average.toFixed(1)}/10`,
    );

    expect(poster).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });

  it('calls onClick when the movie box is clicked', () => {
    render(<MovieBox {...defaultProps} />);

    const movieBox = screen
      .getByRole('img', { name: movie.title })
      .closest('div');
    fireEvent.click(movieBox!);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
