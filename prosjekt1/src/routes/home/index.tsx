// import { useState, useEffect } from 'react';
// import styles from './Home.module.css';
// import SearchBar from '../../components/SeachBar';
// import SortingBox from '../../components/SortingBox';
// import MovieCarousel from '../../components/MovieCarousel';

// const Home = () => {
//   const defaultOption = 'carousel';
//   const [sortOption, setSortOption] = useState<string>(defaultOption);

//   useEffect(() => {
//     const savedOption = sessionStorage.getItem('sortOption');
//     if (savedOption) {
//       setSortOption(savedOption);
//     }
//   }, []);

//   return (
//     <>
//       <div className={styles.controls}>
//         <SearchBar />
//         <SortingBox onSortChange={setSortOption} />
//       </div>
//       <MovieCarousel sortOption={sortOption} />
//     </>
//   );
// };

// export default Home;

import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../components/SeachBar';
import SortingBox from '../../components/SortingBox';
import MovieCarousel from '../../components/MovieCarousel';

const Home = () => {
  const defaultOption = 'carousel';
  const [sortOption, setSortOption] = useState<string>(defaultOption);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const savedOption = sessionStorage.getItem('sortOption');
    if (savedOption) {
      setSortOption(savedOption);
    }
  }, []);

  const handleSearch = (query: string) => {
    setIsSearching(!!query);
  };

  return (
    <>
      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} />
        {!isSearching && (
          <SortingBox onSortChange={setSortOption} disabled={isSearching} />
        )}
      </div>
      {!isSearching && <MovieCarousel sortOption={sortOption} />}
    </>
  );
};

export default Home;
