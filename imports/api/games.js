import { Mongo } from "meteor/mongo";
import { GameLogic, GameStatuses } from "../game/GameLogic.js";

// If new game selected, display unique game id, that users can use to log in to specific game, when they select join game.
// display different data for he judge and the other users.

// https://github.com/hiukim/meteor-multiplayers-game-tutorial
export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
  Meteor.publish("games", function() {
    return Games.find();
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
      host: { _id: this.userId, username: Meteor.user().username } // The game creator is judge for round one.
    });
  },

  // join an existing game
  "games.join"(game) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    const players = game.users;

    if (players.includes(this.userId)) {
      console.log("player is already in the game");
    } else {
      players.push(this.userId);
    }

    Games.update(game._id, {
      $set: { users: players }
    });
  }

  // if (Meteor.isServer) {
  //   Meteor.publish("gameRoundUpdate", function() {
  //     return gameRounds.find({ users: this.userId() });
  //   });
  // }
});
