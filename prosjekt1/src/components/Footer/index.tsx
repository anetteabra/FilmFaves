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
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
            alt="TMDb Logo"
            className={styles.tmdbLogo}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
