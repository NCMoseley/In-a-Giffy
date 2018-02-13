import { Mongo } from "meteor/mongo";

// If new game selected, display unique game id, that users can use to log in to specific game, when they select join game.
// The game creator is judge for round one.
// display different data for he judge and the other users.

export const GameRounds = new Mongo.Collection("gameRounds");

Meteor.methods({});

// if (Meteor.isServer) {
//   Meteor.publish("gameRoundUpdate", function() {
//     return gameRounds.find({ users: this.userId() });
//   });
// }

// export default withTracker(() => {
//   Meteors.subscribe("gameRoundUpdate");
//   return {
//     currentUser: Meteor.user(),
//     currentUserId: Meteor.userId(),
//     currentGameRound: gameRounds.find({ users: this.userId() })
//   };
// })(App);
