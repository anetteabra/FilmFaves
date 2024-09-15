import styles from "./Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import MovieBox from "../../components/MovieBox";

const Home = () => {

  return (
    <>
    <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            className={styles.search}
          />
        </div>
        <MovieBox movieId={550} />
      </div>
    </>

    
  )
  
};

export default Home;
