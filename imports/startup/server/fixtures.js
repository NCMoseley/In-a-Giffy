import { Meteor } from "meteor/meteor";
import { accounts } from "meteor/accounts-base";

// import collections
import { Games } from "/imports/api/games";
import { Submissions } from "/imports/api/submissions";

Meteor.startup(() => {
  if (Meteor.users.find().count() < 2) {
    let userId = Accounts.createUser({
      email: "e@easy.com",
      password: "eee"
    });

    if (Submissions.find().count() === 0) {
      Submissions.insert({
        title: "Take 5 deep breaths",
        winner: false,
        owner: userId
      });
    }
  }
});
