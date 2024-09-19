import styles from './SeachBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import { useNavigate } from 'react-router-dom';
import MovieBox from '../MovieBox';

interface Movie {
  poster_path: string;
  title: string;
  id: number;
  isFave: boolean;
  vote_Average: number;
}

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = (searchParams.get("search") || "");
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  
  const [faves, setFaves] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('faves') || '[]');
  });

  const {data: movies, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });


  useEffect(() => {
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const isInSearch = (value: string) => {
    return (value || "")
      .toLowerCase()
      .includes(searchParams.get("search")?.toLowerCase()|| "");
  };

  const navigate = useNavigate();
  const handleMovieClick = (movie: Movie) => {
    //
    // Use navigate to go to the movie details page
    navigate(`/movie/${movie.id}`);
  };


  return (
    <>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" className={styles.search} 
          value={searchParams.get("search") || ""}
          onChange={(event) =>  {
            setSearchQuery(event.target.value);
          }}
          />
        </div>
        <div id="setList" className={styles.setList}>
          {movies && 
              movies
              .filter((set) => isInSearch(set.title))
              .map((set) => <MovieBox  
              posterPath={set.poster_path}
              title={set.title}
              id={set.id}
              isFave={faves.includes(set.id)}
              faves={faves}
              setFaves={setFaves}
              voteAverage={set.vote_Average}
              onClick={() => handleMovieClick(set!)} />)}
        </div>
    </>
  );
};

export default SearchBar;