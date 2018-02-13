import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

// import collections
import { Games } from "/imports/api/games";

// if (Meteor.isServer) {
//   Meteor.publish("gameRoundUpdate", function() {
//     return gameRounds.find({ users: this.userId() });
//   });
// }

class GameRound extends Component {
  render() {
    console.log(Meteor.users.find().fetch()[0]);
    return (
      <p>GameRound component</p>
      // display who has joined the game and their details
      // display who is currently the judge
      // figure out how to start once players have joined
    );
  }
} // End class GameRound

export default withTracker(() => {
  // Meteor.subscribe("gameRoundUpdate");
  return {
    // users: users.find({}).fetch(), // need to get users out of the users collection
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
    // currentGameRound: gameRounds.find({ users: this.userId() })
  };
})(GameRound);
