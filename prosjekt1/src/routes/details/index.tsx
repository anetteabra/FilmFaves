import styles from './details.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import MovieDetail from '../../components/MovieDetail';

const details = () => {
  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" className={styles.search} />
        </div>
        <MovieDetail posterPath={''} title={''} />
      </div>
    </>
  );
};

export default details;
