import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Submissions = new Mongo.Collection("submissions");

if (Meteor.isServer) {
  Meteor.publish("submissions", function todosPublication() {
    return Submissions.find({});
  });
}

Meteor.methods({
  // Adding
  "submissions.addData"(inputValue, gameId) {
    if (!this.userId) {
      throw new Meteor.Error(
        "submissions.addData.not-authorized",
        "You must be logged in to create a data"
      );
    }
    Submissions.insert({
      game: gameId,
      username: Meteor.user().username,
      title: inputValue,
      winner: false,
      owner: this.userId
    });
  },

  // Select winner
  "submissions.pickWinner"(item) {
    Submissions.update(item._id, {
      $set: { winner: !item.winner }
    });
  },
  "submissions.removeWinner"(item) {
    if (item.owner !== this.userId) {
      throw new Meteor.Error(
        "data.pickWinner.not-authorized",
        "You connot update other users data"
      );
    }
    Submissions.update(item, {
      $set: { winner: false }
    });
  },
  // Removing a data
  "submissions.removeData"() {
    Submissions.remove({});
  },
  // Removing all winnerd data
  "data.removewinnerd"(owner) {
    if (owner !== this.userId) {
      throw new Meteor.Error(
        "data.removewinnerd.not-authorized",
        "You connot remove other users data"
      );
    }

    Submissions.remove({ owner: this.userId, winner: true });
  }
});
