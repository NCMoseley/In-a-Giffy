import React from "react";
import PropTypes from "prop-types";

const StartRoundButton = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Start Round</button>
    </div>
  );
};

StartRoundButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default StartRoundButton;
