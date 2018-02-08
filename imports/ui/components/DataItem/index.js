import React from "react";
import PropTypes from "prop-types";

const DataItem = ({ item, toggleComplete, removeData }) => (
  <div className="single-item">
    <img src={item.title} />
    <input
      type="checkbox"
      id={item._id}
      checked={item.complete}
      onChange={toggleComplete}
    />
    <label htmlFor={item._id} />
    <button onClick={removeData}>
      <i className="fa fa-trash" />
    </button>
  </div>
);

DataItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired
};

export default DataItem;
