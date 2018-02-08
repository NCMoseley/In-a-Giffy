import { Meteor } from "meteor/meteor";
import { accounts } from "meteor/accounts-base";
import { logic } from "../../api/logic";

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    let userId = Accounts.createUser({
      email: "e@easy.com",
      password: "eee"
    });

    if (dataFields.find().count() === 0) {
      dataFields.insert({
        title: "Take 5 deep breaths",
        complete: false,
        owner: userId
      });
    }
  }
});
