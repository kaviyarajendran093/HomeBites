import React from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;
  const [allCategory, setAllCategory] = useState([]);

  //function to get all the category list
  async function getAllCategory() {
    try {
      const { data } = await axios.get(`${API_URL}/api/food`);
      setAllCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
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
    </div>
  );
};

export default Home;
