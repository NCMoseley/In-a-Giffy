import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const dataFields = new Mongo.Collection("data");

if (Meteor.isServer) {
  Meteor.publish("data", function todosPublication() {
    return dataFields.find({ owner: this.userId });
  });
}

Meteor.methods({
  // Adding
  "data.addData"(inputValue) {
    if (!this.userId) {
      throw new Meteor.Error(
        "data.addData.not-authorized",
        "You must be logged in to create a data"
      );
    }
    dataFields.insert({
      title: inputValue,
      complete: false,
      owner: this.userId
    });
  },

  // Toggling complete
  "data.toggleComplete"(item) {
    if (item.owner !== this.userId) {
      throw new Meteor.Error(
        "data.toggleComplete.not-authorized",
        "You connot update other users data"
      );
    }
    dataFields.update(item._id, {
      $set: { complete: !item.complete }
    });
  },
  // Removing a data
  "data.removeData"(item) {
    if (item.owner !== this.userId) {
      throw new Meteor.Error(
        "data.removeData.not-authorized",
        "You connot remove other users data"
      );
    }
    dataFields.remove(item._id);
  },
  // Removing all completed data
  "data.removeCompleted"(owner) {
    if (owner !== this.userId) {
      throw new Meteor.Error(
        "data.removeCompleted.not-authorized",
        "You connot remove other users data"
      );
    }

    Todo.remove({ owner: this.userId, complete: true });
  }
});
