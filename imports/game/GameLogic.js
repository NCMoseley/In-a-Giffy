// export const GameStatuses = {
//   WAITING: "WAITING", // waiting player to join
//   STARTED: "STARTED", // all spots are filled; can start playing
//   FINISHED: "FINISHED", // game is finished
//   ABANDONED: "ABANDONED" // all players left; game is abandoned
// };

export class GameLogic {
  constructor(gameDoc) {
    {
      // this.status = GameStatuses.WAITING;
      this.players = [];
    }
  }

  newGame(user) {
    let game = new Game();
    game.joinGame(user);

    if (!this.userIsAlreadyPlaying()) {
      Games.insert({
        player1: Meteor.userId(),
        player2: "",
        player3: "",
        player4: "",
        status: "waiting",
        result: ""
      });
    }
  }

  userIsAlreadyPlaying() {
    const game = Games.findOne({
      $or: [
        { player1: Meteor.userId() },
        { player2: Meteor.userId() },
        { player3: Meteor.userId() },
        { player4: Meteor.userId() }
      ]
    });

    if (game !== undefined) return true;

    return false;
  }

  joinGame(gameId, user) {
    let game = Games.findOne(gameId);
    game.joinGame(user);
    Games.newGame(game);
    if (this.status !== GameStatuses.WAITING) {
      throw "cannot join at current state";
    }
    if (this.userIndex(user) !== null) {
      throw "user already in game";
    }

    this.players.push({
      userId: user._id,
      username: user.username
    });

    // game automatically start with 3 players
    if (this.players.length > 1) {
      this.status = GameStatuses.STARTED;
    }
  }
}

//   joinGame(game) {
//     if (game.player2 === "" && Meteor.userId() !== undefined) {
//       Games.update(
//         { _id: game._id },
//         {
//           $set: {
//             player2: Meteor.userId(),
//             status: game.player1
//           }
//         }
//       );
//     }
//   }
// }

//   userJoin(user) {
//     if (this.status !== GameStatuses.WAITING) {
//       throw "cannot join at current state";
//     }
//     if (this.userIndex(user) !== null) {
//       throw "user already in game";
//     }

//     this.players.push({
//       userId: user._id,
//       username: user.username
//     });

//   constructor(gameDoc) {
//     if (gameDoc) {
//       _.extend(this, gameDoc);
//     } else {
//       this.status = GameStatuses.WAITING;
//       this.board = [[null, null, null], [null, null, null], [null, null, null]];
//       this.players = [];
//     }
//   }
//   // Meteor.methods({
//   //   "games.play"() {
//   //     const game = Games.findOne({status: "waiting"});

//   //     if(game === undefined) {
//   //       gameLogic.newGame();
//   //     }
//   //   }
//   // });

//   userJoin(user) {
//     if (this.status !== GameStatuses.WAITING) {
//       throw "cannot join at current state";
//     }
//     if (this.userIndex(user) !== null) {
//       throw "user already in game";
//     }

//     this.players.push({
//       userId: user._id,
//       username: user.username
//     });

//     // game automatically start with 2 players
//     if (this.players.length == 1) {
//       this.status = GameStatuses.STARTED;
//     }
//   }

//   userLeave(user) {
//     if (this.status !== GameStatuses.WAITING) {
//       throw "cannot leave at current state";
//     }
//     if (this.userIndex(user) === null) {
//       throw "user not in game";
//     }
//     this.players = _.reject(this.players, player => {
//       return player.userId === user._id;
//     });

//     // game is considered abandoned when all players left
//     if (this.players.length === 0) {
//       this.status = GameStatuses.ABANDONED;
//     }
//   }
// }
// }Meteor.methods({
//   "games.play"() {
//     const game = Games.findOne({status: "waiting"});

//         if(game === undefined) {
//           gameLogic.newGame();
//         } else if(game !== undefined && game.player1 !== this.userId && game.player2 === "") {
//           gameLogic.joinGame(game);
//         }
//       },
//   }
// });
