import { Mongo } from "meteor/mongo";
import { GameLogic, GameStatuses } from "../game/GameLogic.js";

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
      judge: this.userId
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
});
