import { Mongo } from "meteor/mongo";
import { GameLogic, GameStatuses } from "../game/GameLogic.js";

// If new game selected, display unique game id, that users can use to log in to specific game, when they select join game.
// display different data for he judge and the other users.

// https://github.com/hiukim/meteor-multiplayers-game-tutorial
export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
  Meteor.publish("Games", function() {
    return Meteor.Games.find();
  });
}

Meteor.methods({
  // start a new game
  "games.create"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Games.insert({
      createdAt: new Date(),
      users: [this.userId],
      judge: this.userId // The game creator is judge for round one.
    });
  }

  // "games.play"() {
  //   const game = Games.findOne({ status: "waiting" });
  //   if (game === undefined) {
  //     gameLogic.newGame();
  //   } else if (game !== undefined) {
  //     gameLogic.joinGame(user);
  //   }
  // }

  // if (Meteor.isServer) {
  //   Meteor.publish("gameRoundUpdate", function() {
  //     return gameRounds.find({ users: this.userId() });
  //   });
  // }
});
