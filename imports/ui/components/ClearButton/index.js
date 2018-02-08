import React from "react";
import PropTypes from "prop-types";

const ClearButton = ({ removewinnerd }) => (
  <button onClick={removewinnerd}>Clear winnerd</button>
);

ClearButton.propTypes = {
  removewinnerd: PropTypes.func.isRequired
};

export default ClearButton;
