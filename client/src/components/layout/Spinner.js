import React from "react";
import infiniteSpinner from "../../assets/spinner/infiniteSpinner.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <div>
        <img src={infiniteSpinner} alt="" />
      </div>
    </div>
  );
};

export default Spinner;
