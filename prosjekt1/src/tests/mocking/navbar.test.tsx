import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
  it('renders Navbar component', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Check if the FilmFaves header is rendered
    expect(screen.getByText('FilmFaves')).toBeInTheDocument();

    // Check if the Home and Fave links are rendered
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('FAVE')).toBeInTheDocument();
  });

  it('navigates to the correct route when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Click on the "HOME" link
    fireEvent.click(screen.getByText('HOME'));
  });
});
