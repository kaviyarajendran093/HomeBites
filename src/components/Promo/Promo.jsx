import React from "react";
import "./Promo.scss";

const Promo = () => {
  return (
    <div className="promo">
      <p className="promo__content">
        Enjoy delicious savings! Use promo code{" "}
        <span className="promo__content-span">YUMBITES20</span> for 20% off
      </p>
    </div>
  );
};

export default Promo;
