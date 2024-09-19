import styles from './Home.module.css';
import MovieCarousel from '../../components/MovieCarousel';
import SearchBar from '../../components/SeachBar';

const Home = () => {

  return (
    <>
      <div className={styles.controls}>
        <SearchBar/> 
        <MovieCarousel/>
      </div>
    </>
  );
};

export default Home;
