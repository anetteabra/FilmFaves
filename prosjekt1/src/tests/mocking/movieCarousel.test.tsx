import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import MovieCarousel from '../../components/MovieCarousel';
import movies from './movies.json';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('MovieCarousel Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    renderWithProviders(<MovieCarousel sortOption="carousel" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders movies in carousel mode', async () => {
    renderWithProviders(<MovieCarousel sortOption="carousel" />);

    await waitFor(() =>
      expect(screen.getByAltText(movies.results[0].title)).toBeInTheDocument(),
    );
  });

  it('renders movies in rating mode', async () => {
    renderWithProviders(<MovieCarousel sortOption="rating" />);

    await waitFor(() => {
      movies.results.forEach(movie => {
        expect(screen.getByAltText(movie.title)).toBeInTheDocument();
      });
    });
  });

  it('handles next and previous buttons in carousel mode', async () => {
    renderWithProviders(<MovieCarousel sortOption="carousel" />);

    await waitFor(() =>
      expect(screen.getByAltText(movies.results[0].title)).toBeInTheDocument(),
    );

    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);
    await waitFor(() =>
      expect(screen.getByAltText(movies.results[1].title)).toBeInTheDocument(),
    );

    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton);
    await waitFor(() =>
      expect(screen.getByAltText(movies.results[0].title)).toBeInTheDocument(),
    );
  });
});
