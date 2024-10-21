import React from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Cuisine from "../../components/Cuisine/Cuisine";
import Divider from "../../components/Divider/Divider";

const Home = () => {
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;
  const [allCategory, setAllCategory] = useState([]);
  const [allCuisine, setAllCuisine] = useState([]);

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

  useEffect(() => {
    getAllCategory();
    getAllCuisine();
  }, []);

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

  return (
    <div>
      <Hero />
      <Menu category={allCategory} />
      <Divider />
      <Cuisine cuisines={allCuisine} />
    </div>
  );
};

export default Home;
