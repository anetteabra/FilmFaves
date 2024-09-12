import { Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "./home";


const RouterConfig = () => (
  <div data-testid="auth-wrapper">
    <Navbar />
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>404 Page Not Found</h1>}
        />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default RouterConfig;
