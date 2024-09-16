import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import MovieCarousel from "../../components/MovieCarousel";

const Home = () => {
  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" className={styles.search} />
        </div>
        <MovieCarousel />
      </div>
    </>
  );
};

export default Home;
