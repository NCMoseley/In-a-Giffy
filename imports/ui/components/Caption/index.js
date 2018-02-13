import React from "react";
import PropTypes from "prop-types";

const Caption = ({ item }) => (
  <li>
    {item.title}
    {/* <input
      id={item._id}
      // checked={item.complete}
      // onChange={toggleComplete}
    />
    <label htmlFor={item._id} /> */}
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
