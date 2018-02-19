import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Games } from "/imports/api/games";
import "./styles.css";

class Caption extends React.Component {
  constructor() {
    super();
  }
  render() {
    let judge;
    if (this.props.users) {
      judge = this.props.users.users[0].id;
    }

    // console.log(this.props.users ? judge : null);

    return (
      <li className="caption">
        {this.props.item.title} &nbsp;
        {this.props.currentUserId === judge ? (
          <button
            className="submitbutton"
            onClick={this.props.pickWinner}
            id={this.props.item._id}
          >
            Vote
          </button>
        ) : null}
      </li>
    );
  }
}

Caption.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    winner: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired
  })
};

export default withTracker(({ item }) => {
  const game = Meteor.subscribe("games");
  const users = Games.findOne({ _id: item.game });

  return {
    users: users,
    currentUserId: Meteor.userId()
  };
})(Caption);
