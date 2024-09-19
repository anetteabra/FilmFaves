import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './home';
import styles from './routes.module.css';
import Details from './details';

const RouterConfig = () => (
  <div data-testid="auth-wrapper" className={styles.root}>
    <Navbar />
    <div className={styles.content}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route
          path="*"
          element={<h1 style={{ textAlign: 'center' }}>404 Page Not Found</h1>}
        />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default RouterConfig;
