import React from "react";
import "./Footer.scss";
import logo from "../../assets/Images/logos/LogoWhite.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="custom-shape-divider-bottom-1729573338">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="footer__container">
        <div className="footer__logo-wrap">
          <Link to="/">
            <img className="footer__logo" src={logo} alt="Homebite-logo" />
          </Link>
        </div>
        <div className="footer__getInTouch">
          <div className="footer__title">Get In Touch</div>
          <div className="footer__content">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="footer__content-icon"
            />
            <p>503 Broadway Penthouse, Toronto, Canada</p>
          </div>
          <div className="footer__content">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="footer__content-icon"
            />
            <NavLink
              className="footer__email"
              to="mailto:info@homebites.com?subject=Your%20Food%20Has%20Touched%20My%20Heart&body=I%20just%20wanted%20to%20say%20that%20your%20food%20has%20been%20a%20wonderful%20source%20of%20comfort%20and%20nostalgia%20for%20me—thank%20you%20for%20creating%20something%20so%20meaningful.%20Your%20flavors%20and%20recipes%20resonate%20with%20me%20in%20a%20way%20that%20takes%20me%20home,%20and%20I'm%20endlessly%20grateful%20for%20it.%0D%0A%0D%0ARegards,%0D%0AKaviya%20:)"
            >
              <p>info@homebites.com</p>
            </NavLink>
          </div>
          <div className="footer__content">
            <FontAwesomeIcon icon={faPhone} className="footer__content-icon" />
            <p>+1 (234) 567 890</p>
          </div>
        </div>

        <div className="footer__followUs">
          <div className="footer__title footer__followUs-title">Follow us</div>
          <div className="footer__icons">
            <Link to="https://facebook.com">
              <FontAwesomeIcon
                icon={faFacebook}
                className="footer__follow-icon"
              />
            </Link>
            <Link to="https://x.com">
              <FontAwesomeIcon
                icon={faXTwitter}
                className="footer__follow-icon"
              />
            </Link>
            <Link to="https://youtube.com">
              <FontAwesomeIcon
                icon={faYoutube}
                className="footer__follow-icon"
              />
            </Link>
            <Link to="https://instagram.com">
              <FontAwesomeIcon
                icon={faInstagram}
                className="footer__follow-icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
