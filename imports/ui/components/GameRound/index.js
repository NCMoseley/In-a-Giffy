import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
// import { gameRounds } from "../../../api/gameround";

// if (Meteor.isServer) {
//   Meteor.publish("gameRoundUpdate", function() {
//     return gameRounds.find({ users: this.userId() });
//   });
// }

class GameRound extends Component {
  render() {
    return (
      <p>GameRound component</p>
      // display who has joined the game and their details
      // display who is currently the judge
      // figure out how to start once players have joined
    );
  }
} // End class GameRound

export default withTracker(() => {
  Meteor.subscribe("gameRoundUpdate");
  Meteor.subscribe("users");
  return {
    // users: users.find({}).fetch(), // need to get users out of the users collection
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
    // currentGameRound: gameRounds.find({ users: this.userId() })
  };
})(GameRound);
