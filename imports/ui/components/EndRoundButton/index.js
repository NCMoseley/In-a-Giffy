import React from "react";
import PropTypes from "prop-types";

const EndRoundButton = ({ handleWin, handleMistake }) => {
  return (
    <div className="winning">
      <p>
        Happy with your winning gif? Picking gifs is a big responsibility...
      </p>
      <button onClick={handleWin}>Submit Winner</button>
      <button onClick={handleMistake}>Choose Another</button>
    </div>
  );
};

EndRoundButton.propTypes = {
  handleWin: PropTypes.func.isRequired,
  handleMistake: PropTypes.func.isRequired
};

export default EndRoundButton;
