import React from "react";
import "./Gallery.scss";
import { gallery } from "../../utils/utils.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const Gallery = () => {
  const slides = [
    { img: gallery.image1, alt: "Image 1" },
    { img: gallery.image2, alt: "Image 2" },
    { img: gallery.image3, alt: "Image 3" },
    { img: gallery.image4, alt: "Image 4" },
    { img: gallery.image5, alt: "Image 5" },
    { img: gallery.image6, alt: "Image 6" },
    { img: gallery.image7, alt: "Image 7" },
    { img: gallery.image8, alt: "Image 8" },
    { img: gallery.image9, alt: "Image 9" },
    { img: gallery.image10, alt: "Image 10" },
  ];
  return (
    <div className="gallery">
      <div className="gallery__title">Captured Delights</div>
      <section className="gallery__collection">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="gallery__mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="gallery__content">
                <img className="gallery__image" src={slide.img} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Gallery;
