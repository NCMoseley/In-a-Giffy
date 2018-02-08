import React from "react";
import PropTypes from "prop-types";

const Counter = ({ number }) => (
  <div>
    {number} {number > 1 || number === 0 ? "data" : "data"}
  </div>
);

Counter.propTypes = {
  number: PropTypes.number.isRequired
};

export default Counter;
