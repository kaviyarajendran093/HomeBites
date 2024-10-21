import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./ModalPopUp.scss";

export const ModalPopUp = ({ close, Content }) => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__content">
          <button className="modal__close" onClick={close} title="Close">
            <FontAwesomeIcon icon={faTimesCircle} className="modal__icon" />
          </button>
          <div className="modal__sub-content">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopUp;
