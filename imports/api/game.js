import { Mongo } from "meteor/mongo";
import { GameLogic, GameStatuses } from "../game/GameLogic.js";

// https://github.com/hiukim/meteor-multiplayers-game-tutorial
export const Games = new Mongo.Collection("games", () => {
  return Games.find();
});

if (Meteor.isServer) {
  Meteor.publish("Games", function() {
    return Meteor.Games.find();
  });
}

Meteor.methods({
  "Games.play"() {
    const game = Games.findOne({ status: "waiting" });

    if (game === undefined) {
      gameLogic.newGame();
    } else if (game !== undefined) {
      gameLogic.joinGame(user);
    }
  }
});
