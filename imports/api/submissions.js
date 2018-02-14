import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Submissions = new Mongo.Collection("submissions");

if (Meteor.isServer) {
  Meteor.publish("submissions", function todosPublication() {
    return Submissions.find({ owner: this.userId });
  });
}

Meteor.methods({
  // Adding
  "submissions.addData"(inputValue) {
    if (!this.userId) {
      throw new Meteor.Error(
        "submissions.addData.not-authorized",
        "You must be logged in to create a data"
      );
    }
    submissions.insert({
      title: inputValue,
      winner: false,
      owner: this.userId
    });
  },

  // Select winner
  "submissions.toggleWinner"(item) {
    if (item.owner !== this.userId) {
      throw new Meteor.Error(
        "data.toggleWinner.not-authorized",
        "You connot update other users data"
      );
    }
    Submissions.update(item._id, {
      $set: { winner: !item.winner }
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
