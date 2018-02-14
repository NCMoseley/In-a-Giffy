import { Meteor } from "meteor/meteor";
import { accounts } from "meteor/accounts-base";

// import collections
import { Games } from "/imports/api/games";
import { Submissions } from "/imports/api/submissions";

// https://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts
// https://docs.meteor.com/api/accounts-multi.html#AccountsServer-onCreateUser
Accounts.onCreateUser((options, user) => {
  const defaultUsernames = [
    "understoodocciput",
    "fiercetermites",
    "volcanicsousaphone",
    "informalbubbles",
    "absolutecummerbund",
    "mindlesshullabaloo",
    "unusedphalange",
    "cavernousfolderol",
    "quixoticsprout",
    "bothbrouhaha",
    "futuristicirked",
    "equablefurbelow",
    "chemicalturdiform",
    "lumberingcodswallop",
    "venalsickle",
    "powerfulwharf",
    "spitefulsqueegee",
    "thunderousflunk",
    "miserlybobbin",
    "bustlinggauze",
    "knownlozenge",
    "elasticbodacious",
    "reveredliripoop",
    "realisticblubber",
    "erectargybargy",
    "uselessfinagle",
    "variouspanjandrum",
    "edibleeructation",
    "beautifulcentipede",
    "momentousfilibuster",
    "firsthandfallopian",
    "foolishsnout",
    "maternalfrippery",
    "unreliablescribble",
    "horriblenoddle",
    "wantingpilcrow",
    "previousbowl",
    "greyfurbelows",
    "pensivefartlek",
    "agedbladder",
    "cleverdiphthong",
    "secretsag",
    "tubbyburgoo",
    "coldquean",
    "faultygoggles",
    "paltrycrapulence",
    "wackybooty",
    "spotteddollop",
    "smilingsnorkel",
    "caringlollygag"
  ];
  const defaultUsername =
    defaultUsernames[Math.floor(Math.random() * defaultUsernames.length)];

  const customizedUser = Object.assign(
    {
      // username: _.random(1, 6) + _.random(1, 6) + _.random(1, 6)
      username: defaultUsername
    },
    user
  );

  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
});

Meteor.startup(() => {
  if (Meteor.users.find().count() < 2) {
    let userId = Accounts.createUser({
      username: "Englebert Humperdink",
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
