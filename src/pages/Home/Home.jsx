import React from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import Topchefs from "../../components/TopChefs/Topchefs";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Cuisine from "../../components/Cuisine/Cuisine";
import Divider from "../../components/Divider/Divider";
import { ModalPopUp } from "../../components/ModalPopUp/ModalPopUp";
import emptyPlate from "../../assets/Images/error/Chef-cuate.png";
import Gallery from "../../components/Gallery/Gallery";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ScrollToUp from "../../components/ScrollToUp/ScrollToUp";
import Promo from "../../components/Promo/Promo";

const Home = () => {
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;
  const [allCategory, setAllCategory] = useState([]);
  const [allCuisine, setAllCuisine] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menu = useRef(null);
  const gallery = useRef(null);
  const topChefs = useRef(null);

  // Get the current location (URL)
  const location = useLocation();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //function to get all the category list
  async function getAllCategory() {
    try {
      const { data } = await axios.get(`${API_URL}/api/food`);
      setAllCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  //function to get all the category list
  async function getAllCuisine() {
    try {
      const { data } = await axios.get(`${API_URL}/api/food/cuisine`);
      setAllCuisine(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCuisineByCategoryId() {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/food/cuisine/${categoryId}`
      );

      if (data.length > 0) {
        setAllCuisine(data);
      } else {
        openModal();
        setCategoryId(null);
        getAllCuisine();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to pass as prop to category component to fetch category id
  const getcategoryId = (cat_id) => {
    setCategoryId(cat_id);
  };

  //get all the initial data from api
  useEffect(() => {
    getAllCategory();
    getAllCuisine();
    localStorage.setItem("userId", 401);
  }, []);

  //get cuisine details based on the menu/category selected
  useEffect(() => {
    if (categoryId !== null) {
      getCuisineByCategoryId();
    } else {
      getAllCuisine();
    }
  }, [categoryId]);

  useEffect(() => {
    const hash = location.hash;

    setTimeout(() => {
      if (hash === "#menu" && menu.current) {
        menu.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#gallery" && gallery.current) {
        gallery.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#topChefs" && topChefs.current) {
        topChefs.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }, [location]);

  if (!allCategory.length) {
    return <Loading />;
  }

  //child component for error handling while selecting the cuisine
  const ErrorHandler = () => {
    return (
      <div className="error">
        <img className="error__image" src={emptyPlate} alt="empty_plate" />
        <p className="error__content">
          "Sorry, we're out of delicious options in this category right now—but
          more flavors are coming soon!"
        </p>
      </div>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Hero />
      <div ref={menu}>
        <Menu category={allCategory} getcategoryId={getcategoryId} />
      </div>
      <Divider />
      <Cuisine cuisines={allCuisine} category_id={categoryId} />
      {isOpen && <ModalPopUp close={closeModal} Content={ErrorHandler} />}
      <Divider />
      <div ref={gallery}>
        <Gallery />
      </div>
      <Promo />
      <div ref={topChefs}>
        <Topchefs />
      </div>
      <ScrollToUp />
    </div>
  );
};

export default Home;
