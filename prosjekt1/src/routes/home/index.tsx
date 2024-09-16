import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import MovieCarousel from '../../components/MovieCarousel';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/tmdbApi';
import MovieBox from '../../components/MovieBox';

interface Movie {
  poster_path: string;
  title: string;
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search"));
  
  const movieQuery = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const isInSearch = (value: string) => {
    return (value || "")
      .toLowerCase()
      .includes(searchParams.get("search")?.toLowerCase()|| "");
  };

  useEffect(() => {
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);


  return (
    <>
      <div className={styles.controls}>
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
          {movieQuery.status === "success" && 
            movieQuery.data
              .filter(
                (set) =>
                  isInSearch(set.title)
              )
              .map((set) => <MovieBox posterPath={set.poster_path} title={set.title} />)}
        </div>
        <MovieCarousel />
      </div>
    </>
  );
};

export default Home;
