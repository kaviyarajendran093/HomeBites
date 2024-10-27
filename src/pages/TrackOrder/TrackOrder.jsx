import React from "react";
import "./TrackOrder.scss";
import Divider from "../../components/Divider/Divider";
import Loading from "../../components/Loading/Loading";
import packageIcon from "../../assets/Images/trackOrder/package.png";
import trackImage from "../../assets/Images/theme/Take Away-pana.png";
import axios from "axios";
import { useEffect, useState } from "react";

const TrackOrder = () => {
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;
  const [trackOrder, setTrackOrder] = useState([]);

  async function getTrackOrder() {
    try {
      const userId = localStorage.getItem("userId");
      const orderId = localStorage.getItem("orderId");
      const { data } = await axios.get(
        `${API_URL}/api/trackOrder/${userId}/${orderId}`
      );
      setTrackOrder(data);
      console.log(userId, orderId, data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrackOrder();
  }, []);

  if (!trackOrder.length) {
    return <Loading />;
  }

  return (
    <div className="trackOrder">
      <div className="trackOrder__title">Track Order</div>
      <div className="trackOrder__items">
        <div className="trackOrder__headDivider">
          <Divider />
        </div>
        <div className="trackOrder__info-wrap">
          <div className="trackOrder__item">
            <img
              className="trackOrder__image"
              src={packageIcon}
              alt="package"
            />
          </div>
          <div className="trackOrder__item">
            <p className="trackOrder__col">
              {trackOrder[0].food_items_quantities}
            </p>
          </div>
          <div className="trackOrder__item">
            <p className="trackOrder__col">
              ${trackOrder[0].overall_total_price}
            </p>
          </div>
          <div className="trackOrder__item">
            <p className="trackOrder__col">{`item : ${trackOrder[0].overall_total_quantity}`}</p>
          </div>
          <div className="trackOrder__item">
            <p className="trackOrder__col trackOrder__status">
              {trackOrder[0].status}
            </p>
          </div>
        </div>
        <div className="trackOrder__headDivider">
          <Divider />
        </div>
        <div className="trackOrder__center-image">
          <img className="trackOrder__img" src={trackImage} alt="tracker" />
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
