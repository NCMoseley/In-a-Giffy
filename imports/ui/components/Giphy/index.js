import React from "react";
import PropTypes from "prop-types";

const GiphyResult = ({ url }) => {
  console.log(url);
  return (
    <div className="giphy-image-container">
      <img src={url} alt="Giphy image" />
    </div>
  );
};

GiphyResult.propTypes = {
  url: PropTypes.string.isRequired
};

export default GiphyResult;
