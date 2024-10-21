import React, { useEffect, useRef } from "react";
import promo_video from "../../assets/Images/video/Promo_Video.mp4";
import "./VideoDisplay.scss";

const VideoDisplay = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();
  }, []);

  return (
    <video ref={videoRef} controls className="video">
      <source src={promo_video} type="video/mp4" />
    </video>
  );
};

export default VideoDisplay;
