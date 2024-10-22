import React from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Cuisine from "../../components/Cuisine/Cuisine";
import Divider from "../../components/Divider/Divider";
import { ModalPopUp } from "../../components/ModalPopUp/ModalPopUp";
import emptyPlate from "../../assets/Images/error/empty_plate.png";
import Gallery from "../../components/Gallery/Gallery";
import { useParams, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllCategory();
    getAllCuisine();
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      getCuisineByCategoryId();
    } else {
      getAllCuisine();
    }
  }, [categoryId]);

  useEffect(() => {
    const hash = location.hash;

    if (hash === "#menu" && menu.current) {
      menu.current.scrollIntoView({ behavior: "smooth" });
    } else if (hash === "#gallery" && gallery.current) {
      gallery.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  if (!allCategory.length) {
    return (
      <>
        <div className="loading__container">
          <h3 className="loading">Fetching data! Please wait...</h3>
          <div className="spinner"></div>
        </div>
      </>
    );
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

  return (
    <div>
      <Hero />
      <div ref={menu}>
        <Menu category={allCategory} getcategoryId={getcategoryId} />
      </div>
      <Divider />
      <Cuisine cuisines={allCuisine} />
      {isOpen && <ModalPopUp close={closeModal} Content={ErrorHandler} />}
      <Divider />
      <div ref={gallery}>
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
