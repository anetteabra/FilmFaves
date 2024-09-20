import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from '../../components/SeachBar';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('SearchBar Component', () => {
  it('should render the search bar', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SearchBar onSearch={vi.fn()} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const inputElement = screen.getByTestId('search-input');
    expect(inputElement).toBeInTheDocument();
  });
});
