import { render } from '@testing-library/react';
import MovieBox from '../../components/MovieBox';
import { vi } from 'vitest';

test('renders MovieBox component correctly', () => {
  const mockProps = {
    posterPath: '/path/to/poster.jpg',
    title: 'Mock Movie',
    id: 1,
    isFave: false,
    toggleFave: vi.fn(), // Mocking toggleFave
    voteAverage: 8.5,
    onClick: vi.fn(), // Mocking onClick
  };

  const movieBox = render(<MovieBox {...mockProps} />);
  expect(movieBox).toMatchSnapshot();
});
