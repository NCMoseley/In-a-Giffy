import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const GiphyResult = ({ url }) => {
  return (
    <div
      className="giphy-image-container"
      style={{
        backgroundImage: `url(${url})`
      }}
    />
    // <img src={url} alt="Giphy image" />
  );
};

GiphyResult.propTypes = {
  url: PropTypes.string
};

export default GiphyResult;
