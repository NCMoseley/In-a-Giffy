import { Mongo } from "meteor/mongo";
import { HTTP } from "meteor/http";

// If new game selected, display unique game id, that users can use to log in to specific game, when they select join game.

// The game creator is judge for round one.

// display different data for he judge and the other users.

export const gameRounds = new Mongo.Collection("gameRounds");

Meteor.methods({
  "gameRounds.Create"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    gameRounds.insert({
      createdAt: new Date(),
      users: [this.userId],
      judge: this.userId
    });
  }
});

// const gameRounds = New.Mongo.Collection("gameRounds");

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
