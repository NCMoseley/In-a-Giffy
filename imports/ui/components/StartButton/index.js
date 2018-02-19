import React from "react";
import PropTypes from "prop-types";

const StartButton = ({ handleClick }) => {
  return (
    <div className="nextgif">
      <button onClick={handleClick}>Try Another Gif</button>
    </div>
  );
};

StartButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default StartButton;
