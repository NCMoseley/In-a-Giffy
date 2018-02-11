// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { gameRounds } from "../../../api/gameround";

// if (Meteor.isServer) {
//   Meteor.publish("gameRoundUpdate", function() {
//     return gameRounds.find({ users: this.userId() });
//   });
// }

// // class GameRound extends Component() {
// //   render(

// //     // display who has joined the game

// //     // start once players have joined

// //   )
// // };

// export default withTracker(() => {
//   Meteors.subscribe("gameRoundUpdate");
//   return {
//     currentUser: Meteor.user(),
//     currentUserId: Meteor.userId(),
//     currentGameRound: gameRounds.find({ users: this.userId() })
//   };
// })(GameRound);
