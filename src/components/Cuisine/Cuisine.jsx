import React from "react";
import "./Cuisine.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Cuisine = (props) => {
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;

  const navigateToOrder = (cuisine_id) => {
    if (props.category_id !== null) {
      navigate(`/Order/${props.category_id}/${cuisine_id}`);
    } else {
      navigate(`/Order/${cuisine_id}`);
    }
  };

  return (
    <div className="cuisine">
      <div className="cuisine__title">Explore our cuisine</div>
      <div className="cuisine__list">
        {props.cuisines.map((cuisine) => (
          <div className="cuisine__card" key={cuisine.cuisine_id}>
            <div className="cuisine__image-wrapper">
              <img
                className="cuisine__image"
                src={`${baseurl}/images/${cuisine.image_url}`}
                alt={cuisine.cuisine_name}
              />
            </div>
            <div className="cuisine__description">
              <p className="cuisine__description-title">
                {cuisine.cuisine_name}
              </p>
              <p className="cuisine__description-content">
                {cuisine.description}
              </p>
              <button
                className="cuisine__button"
                title="cuisine"
                onClick={() => {
                  navigateToOrder(cuisine.cuisine_id);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="cuisine__plus" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisine;
