import styles from './details.module.css';
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
