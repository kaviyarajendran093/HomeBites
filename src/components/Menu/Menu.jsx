import React from "react";
import "./Menu.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const Menu = ({ category }) => {
  const [active, setActive] = useState(null); //Track active link
  const [prevActive, setPrevActive] = useState(null);

  //settings for slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 767, // When screen width is 767 or less
        settings: {
          slidesToShow: 2, // Show 2 slide
          slidesToScroll: 2, // Scroll 2 slide
        },
      },
      {
        breakpoint: 320, // When screen width is 320px or less
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1, // Scroll 1 slide
        },
      },
    ],
  };

  //event to handle each category on click
  const handleCategory = (category_id) => {
    setPrevActive(active);
    setActive(category_id);
  };

  return (
    <div className="menu">
      <div className="menu__title">Menu</div>
      <div className="menu__card-list">
        <Slider {...settings} className="menu__slider">
          {category.map((item) => (
            <div
              className="menu__card"
              onClick={() => {
                handleCategory(item.category_id);
              }}
              value={item.category_id}
              key={item.category_id}
            >
              <img
                className={`menu__image ${
                  active === item.category_id && prevActive !== item.category_id
                    ? "menu__active"
                    : ""
                }`}
                src={`http://localhost:5050/images/${item.image_url}`}
                alt={item.image_url}
              />
              <p className="menu__name">{item.category}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Menu;
