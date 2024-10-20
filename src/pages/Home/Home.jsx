import React from "react";
import "./Home.scss";
import hero from "../../assets/Images/hero/heroImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero__image-wrapper">
        <img className="hero__image" src={hero} />
      </div>
      <div className="hero__content-wrapper">
        <div className="hero__content">
          <p className="hero__title">Enjoy Our Delicious Meal</p>
          <p className="hero__description">
            Craving the taste of home? Connect with local chefs who bring
            authentic, homemade meals from your community straight to your door.
            Enjoy fresh, home-cooked dishes crafted with love and delivered with
            care.
          </p>

          <button className="hero__button">
            <FontAwesomeIcon icon={faPlay} fade className="hero__play" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
