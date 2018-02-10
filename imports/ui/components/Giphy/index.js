import React from "react";
import PropTypes from "prop-types";

const GiphyResult = ({ url }) => {
  return (
    <div className="giphy-image-container">
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundImage: `url(${url})`
        }}
      />
      {/* <img src={url} alt="Giphy image" /> */}
    </div>
  );
};

GiphyResult.propTypes = {
  url: PropTypes.string
};

export default GiphyResult;
