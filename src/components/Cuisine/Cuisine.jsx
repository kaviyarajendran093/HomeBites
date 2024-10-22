import React from "react";
import "./Cuisine.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Cuisine = ({ cuisines }) => {
  const navigateToOrder = (cuisine_id) => {
    console.log(cuisine_id);
  };

  return (
    <div className="cuisine">
      <div className="cuisine__title">Explore our cuisine</div>
      <div className="cuisine__list">
        {cuisines.map((cuisine) => (
          <div className="cuisine__card" key={cuisine.cuisine_id}>
            <div className="cuisine__image-wrapper">
              <img
                className="cuisine__image"
                src={`http://localhost:5050/images/${cuisine.image_url}`}
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
