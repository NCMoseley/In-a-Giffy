import React from "react";
import PropTypes from "prop-types";

const GifButton = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Try Another Gif</button>
    </div>
  );
};

GifButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default GifButton;
