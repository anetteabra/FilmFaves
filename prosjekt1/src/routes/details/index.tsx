import styles from './details.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import MovieDetail from '../../components/MovieDetail';

const details = () => {
  return (
    <>
      <div className={styles.controls}>
        <MovieDetail />
      </div>
    </>
  );
};

export default details;
