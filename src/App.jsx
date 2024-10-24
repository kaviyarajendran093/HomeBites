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
import Order from "./pages/Order/Order";
import Cart from "./components/Cart/Cart";

function App() {
  const ScrollTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
  };
  return (
    <>
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
              <Route path="/Order/:cuisine_id" element={<Order />} />
              <Route
                path="/Order/:category_id/:cuisine_id"
                element={<Order />}
              />
              <Route path="/Cart" element={<Cart />} />
            </Routes>

            <div className="main__footer">
              <Footer />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
