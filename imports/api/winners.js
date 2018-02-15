import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Winners = new Mongo.Collection("winners");

if (Meteor.isServer) {
  Meteor.publish("winners", function() {
    return Winners.find({});
  });
}

Meteor.methods({
  "winners.getWinners"(winners) {
    if (!this.userId) {
      throw new Meteor.Error(
        "submissions.addData.not-authorized",
        "You must be logged in to create a data"
      );
    }
    Winners.insert({
      winners: winners
    });
  }
});
