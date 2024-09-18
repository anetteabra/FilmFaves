import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SeachBar';
import SortingBox from '../../components/SortingBox';
import MovieCarousel from '../../components/MovieCarousel';

const Home = () => {
  const defaultOption = 'carousel';
  const [sortOption, setSortOption] = useState<string>(defaultOption);

  useEffect(() => {
    const savedOption = sessionStorage.getItem('sortOption');
    if (savedOption) {
      setSortOption(savedOption);
    }
  }, []);

  return (
    <>
      <div className={styles.controls}>
        <SearchBar />
        <SortingBox onSortChange={setSortOption} />
      </div>
      <MovieCarousel sortOption={sortOption} />
    </>
  );
};

export default Home;
