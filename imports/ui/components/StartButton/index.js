import React from "react";
import PropTypes from "prop-types";

const StartButton = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Let's get Giffy With It </button>
    </div>
  );
};

StartButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default StartButton;
