import "./PageNotFound.scss";
import { NavLink } from "react-router-dom";
import error from "../../assets/Images/theme/404 Error.png";

export default function PageNotFound() {
  return (
    <>
      <div className="pageNotFound">
        <img className="pageNotFound__image" src={error} alt="404Error" />
        <p className="pageNotFound__description">
          The page you are looking for might have been removed or does not
          exist.
        </p>
        <NavLink className="pageNotFound__link" to="/">
          Go back to the Homepage
        </NavLink>
      </div>
    </>
  );
}
