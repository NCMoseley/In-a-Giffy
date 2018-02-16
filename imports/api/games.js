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
  async "games.create"(game) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    const newGame = Games.insert({
      createdAt: new Date(),
      started: false,
      users: [
        {
          id: this.userId,
          score: 0
        }
      ],
      host: {
        _id: this.userId,
        username: Meteor.user().username
      } // The game creator is judge for round one.
    });
    return newGame;
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
      players.push({ id: this.userId, score: 0 });
    }

    Games.update(game._id, {
      $set: {
        users: players
      }
    });
  },

  "games.start"(gameId) {
    console.log("does this work!!??", gameId);
    Games.update(gameId, {
      $set: {
        started: true
      }
    });
  },

  "games.score"(game, user) {
    Games.update(
      { _id: game, "users.id": user },
      { $inc: { "users.$.score": 1 } }
    );
  }
});
