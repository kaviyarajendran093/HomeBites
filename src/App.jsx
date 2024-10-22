import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";

function App() {
  const ScrollTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
  };
  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <ScrollTop />
        <div className="main__page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category_id" element={<Home />} />
            <Route path="/Menu" element={<Home />} />
            <Route path="/Gallery" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
