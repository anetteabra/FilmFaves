import { render } from '@testing-library/react';
import MovieCarousel from '../../components/MovieCarousel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

test('renders MovieCarousel component correctly', () => {
  const movieCarousel = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieCarousel sortOption="rating" />
      </BrowserRouter>
    </QueryClientProvider>,
  );
  expect(movieCarousel).toMatchSnapshot();
});
