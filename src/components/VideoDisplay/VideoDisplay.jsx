import React from "react";
import promo_video from "../../assets/Images/video/Promo_Video.mp4";
import "./VideoDisplay.scss";

const VideoDisplay = () => {
  return (
    <video controls className="video">
      <source src={promo_video} type="video/mp4" />
    </video>
  );
};

export default VideoDisplay;
