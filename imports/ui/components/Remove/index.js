import React from "react";
import PropTypes from "prop-types";

const Remove = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
};

Remove.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default Remove;
