import styles from './SeachBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../../components/MovieBox';

interface Movie {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );
  const [isTyping, setIsTyping] = useState(false);
  const [faves, setFaves] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('faves') || '[]');
  });

  const movieQuery = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const navigate = useNavigate();

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const isInSearch = (value: string) => {
    return (value || '').toLowerCase().includes(searchQuery.toLowerCase());
  };

  useEffect(() => {
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
    });
    onSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const toggleFave = (id: number) => {
    const newFaves = faves.includes(id)
      ? faves.filter(faveId => faveId !== id)
      : [...faves, id];
    setFaves(newFaves);
    localStorage.setItem('faves', JSON.stringify(newFaves));
  };

  const filteredMovies =
    movieQuery.data?.filter(movie => isInSearch(movie.title)) || [];

  return (
    <>
      <div className={styles.searchContainer}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          className={styles.search}
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
            setIsTyping(event.target.value.length > 0);
          }}
        />
      </div>
      {isTyping && (
        <div id="setList" className={styles.setList}>
          {movieQuery.status === 'success' && filteredMovies.length === 0 ? (
            <div className={styles.message}>
              <p>No results found for "{searchQuery}".</p>
            </div>
          ) : (
            filteredMovies.map(movie => (
              <MovieBox
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                id={movie.id}
                isFave={faves.includes(movie.id)}
                toggleFave={() => toggleFave(movie.id)}
                voteAverage={movie.vote_average}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
