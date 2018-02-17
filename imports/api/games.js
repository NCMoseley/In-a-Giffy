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
  async "games.create"(name) {
    // Make sure the user is logged in before inserting a task
    // const gameName = "input";
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    const newGame = Games.insert({
      createdAt: new Date(),
      started: false,
      over: false,
      users: [
        {
          id: this.userId,
          score: 0
        }
      ],

      host: { _id: this.userId, username: Meteor.user().username }, // The game creator is judge for round one.
      gameName: name
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
      players.push({
        id: this.userId,
        score: 0,
        username: Meteor.user().username
      });
    }

    Games.update(game._id, {
      $set: {
        users: players
      }
    });
  },

  "games.start"(gameId) {
    Games.update(gameId, {
      $set: {
        started: true
      }
    });
  },

  "games.over"(gameId) {
    Games.update(gameId, {
      $set: {
        over: true
      }
    });
  },

  "games.score"(game, user) {
    Games.update(
      { _id: game, "users.id": user },
      { $inc: { "users.$.score": 1 } }
    );
  },

  "games.removeGame"(gameId) {
    Games.remove(gameId, {
      _id: gameId
    });
  },

  "games.toggleJudge"(game) {
    const players = game.users;
    const currentJudge = players.shift();
    players.push(currentJudge);
    console.log(players);
    Games.update(game._id, {
      $set: {
        users: players
      }
    });
  }
});
