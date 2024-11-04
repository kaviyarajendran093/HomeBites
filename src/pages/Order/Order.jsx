import React, { useState, useEffect } from "react";
import "./Order.scss";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import FoodList from "../../components/FoodList/FoodList";

const Order = () => {
  const { cuisine_id, category_id } = useParams();
  const [chefs, setChefs] = useState([]);
  const [chefId, setChefId] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}`;

  async function getChef() {
    try {
      if (category_id) {
        const { data } = await axios.get(
          `${API_URL}/api/order/${cuisine_id}/${category_id}`
        );
        setChefs(data);
      } else {
        const { data } = await axios.get(`${API_URL}/api/order/${cuisine_id}`);
        setChefs(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChef();
  }, []);

  if (!chefs.length) {
    return <Loading />;
  }

  const navigateToOrder = (chef_id) => {
    setChefId(chef_id);
    setIsVisible(true);
  };

  return (
    <div className="order">
      <div className="order__title">
        {category_id
          ? `${chefs[0].cuisine_name} cuisine categorised by menu`
          : `${chefs[0].cuisine_name} cuisine`}
      </div>
      <div className="order__list">
        {chefs.map((chef) => (
          <div className="order__card" key={chef.chef_id}>
            <div className="order__image-wrapper">
              <img
                className="order__image"
                src={`${baseurl}:${port}/images/${chef.image_url}`}
                alt={chef.name}
              />
            </div>
            <div className="order__description">
              <p className="order__description-title">{chef.name}</p>
              <div className="order__content-wrapper">
                <p className="order__description-content">
                  {parseFloat(parseFloat(chef.rating).toFixed(1))}/5
                </p>
                <FontAwesomeIcon icon={faStar} className="order__star" />
              </div>
              <div className="order__button-wrap">
                <button
                  className={`order__button ${
                    chefId === chef.chef_id ? "active" : ""
                  }`}
                  title="order"
                  onClick={() => {
                    navigateToOrder(chef.chef_id);
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isVisible && chefId && (
        <FoodList chef_id={chefId} category_id={category_id} />
      )}
    </div>
  );
};

export default Order;
