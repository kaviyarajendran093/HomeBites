import "./DeliveryInfo.scss";
import React from "react";

const DeliveryInfo = () => {
  return (
    <div className="placeOrder">
      <div className="placeOrder__deliveryInfo">
        <div className="placeOrder__deliveryInfo-title">
          Delivery Information
        </div>
        <div className="placeOrder__form"></div>
      </div>
      <div className="placeOrder__cart"></div>
    </div>
  );
};

export default DeliveryInfo;
