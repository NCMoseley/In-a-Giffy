import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Caption = ({ item, toggleWinner }) => (
  <li className="caption">
    {item.title}
    <input
      type="checkbox"
      id={item._id}
      checked={item.winner}
      onChange={toggleWinner}
    />
  </li>
);

Caption.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    winner: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired
  })
  // toggleComplete: PropTypes.func.isRequired,
  // removeToDo: PropTypes.func.isRequired
};

export default Caption;
