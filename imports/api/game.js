import { Mongo } from "meteor/mongo";
import { GameLogic } from "../game/GameLogic.js";

// https://github.com/hiukim/meteor-multiplayers-game-tutorial
export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
  Meteor.publish("Games", function() {
    return Games.find();
  });
}

// {
//   transform(doc) {
//     return new Game(doc);
//   }
// }));

Meteor.methods({
  "games.play"() {
    const game = Games.findOne({ status: "waiting" });

    if (game === undefined) {
      gameLogic.newGame();
    } else if (game !== undefined) {
      gameLogic.joinGame(game);
    }
  }
});
