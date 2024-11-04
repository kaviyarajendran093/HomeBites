import React, { useEffect, useState } from "react";
import "./TopChefs.scss";
import Divider from "../../components/Divider/Divider";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faXTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faStar, faPhone } from "@fortawesome/free-solid-svg-icons";

const Topchefs = () => {
  const [topChefs, setTopChefs] = useState([]);
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}`;

  async function getTopChefs() {
    try {
      const { data } = await axios.get(`${API_URL}/api/food/topchef`);
      setTopChefs(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTopChefs();
  }, []);

  if (!topChefs.length) {
    return <Loading />;
  }

  return (
    <div className="topChefs">
      <Divider />
      <div className="topChefs__title">Top Chefs</div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },
        }}
        spaceBetween={20}
        slidesPerView={"auto"}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {topChefs.map((chef) => (
          <SwiperSlide key={chef.chef_id}>
            <div className="topChefs__card">
              <img
                className="topChefs__image"
                src={`${baseurl}/images/${chef.image_url}`}
                alt={chef.name}
              />
              <div className="topChefs__description">
                <p className="topChefs__description-title">{chef.name}</p>
                <div className="topChefs__description-content">
                  <div className="topChefs__description-rating">
                    <p>{parseFloat(parseFloat(chef.rating).toFixed(1))}/5</p>
                    <FontAwesomeIcon icon={faStar} className="topChefs__star" />
                  </div>
                  <div className="topChefs__description-rating">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="topChefs__star"
                    />
                    <p>{`+1 ${chef.phone_no}`}</p>
                  </div>
                  <div className="topChefs__description-rating">
                    <Link to="https://facebook.com">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="topChefs__star"
                      />
                    </Link>
                    <Link to="https://x.com">
                      <FontAwesomeIcon
                        icon={faXTwitter}
                        className="topChefs__star"
                      />
                    </Link>
                    <Link to="https://youtube.com">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="topChefs__star"
                      />
                    </Link>
                    <Link to="https://instagram.com">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="topChefs__star"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Topchefs;
