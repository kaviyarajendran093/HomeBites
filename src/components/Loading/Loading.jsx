import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <>
      <div className="loading__container">
        <h3 className="loading">Fetching data! Please wait...</h3>
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Loading;
