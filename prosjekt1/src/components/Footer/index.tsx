import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.love}>
        <FontAwesomeIcon icon={faHeart} />
        <p>Powered by</p>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src="/project1/src/assets/tmdb.svg"
            alt="TMDb Logo"
            className={styles.tmdbLogo}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
