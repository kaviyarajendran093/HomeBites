import React from "react";
import "./ScrollToUp.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
const ScrollToUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? "block" : "none" }}
    >
      <FontAwesomeIcon icon={faArrowUp} className="scroll-to-top__ArrowUp" />
    </button>
  );
};

export default ScrollToUp;
