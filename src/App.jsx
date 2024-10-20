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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
