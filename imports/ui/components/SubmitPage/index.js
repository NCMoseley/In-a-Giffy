import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { BrowserRouter, Link } from "react-router-dom";
import "./styles.css";

// import collections
import { Games } from "/imports/api/games";
import { GiphyUrls } from "/imports/api/giphy";
import { Submissions } from "/imports/api/submissions";
import { Winners } from "/imports/api/winners";

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper";
import Caption from "/imports/ui/components/Caption";
import CaptionField from "/imports/ui/components/CaptionField";
import Giphy from "/imports/ui/components/Giphy"; // import Giphy front-end component
import GifButton from "/imports/ui/components/GifButton";
import StartRoundButton from "/imports/ui/components/StartRoundButton";
import EndRoundButton from "/imports/ui/components/EndRoundButton";

class SubmitPage extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      revealButton: false,
      gameWin: false
    };

    this.addData = this.addData.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getWinners = this.getWinners.bind(this);
    this.increaseScore = this.increaseScore.bind(this);
    this.removeWinner = this.removeWinner.bind(this);
    this.removeGame = this.removeGame.bind(this);
  }

  // toggle the checkbox to denote completion status
  pickWinner(item) {
    Meteor.call("submissions.pickWinner", item);
    this.setState({
      revealButton: !this.state.revealButton
    });
  }

  removeWinner() {
    Meteor.call(
      "submissions.removeWinner",
      this.props.winners ? this.props.winners[0] : null
    );
    this.setState({
      revealButton: !this.state.revealButton
    });
  }

  //appending game on text to notify players game is on
  gameStart() {
    Meteor.call("games.start", this.props.game._id);
  }

  // adding a new caption

  addData(event) {
    event.preventDefault();

    if (this.dataInput.value) {
      Meteor.call(
        "submissions.addData",
        this.dataInput.value,
        this.props.game._id
      );
      this.dataInput.value = "";
    }
    this.setState({
      hidden: !this.state.hidden
    });
  }

  getWinners() {
    Meteor.call("winners.getWinners", this.props.winners);
  }

  increaseScore() {
    Meteor.call(
      "games.score",
      this.props.game._id,
      this.props.winners[0] ? this.props.winners[0].owner : null
    );
    Meteor.call("games.displayWinner", this.props.game._id);

    this.setState({
      revealButton: !this.state.revealButton,
      hidden: !this.state.hidden
    });

    setTimeout(() => {
      let winner = this.props.game.users.find(user => user.score > 1);
      if (winner) {
        Meteor.call("games.over", this.props.game._id);
        setTimeout(() => {
          Meteor.call("games.removeGame", this.props.game._id);
          Meteor.call("submissions.removeData", this.props.game._id);
        }, 3000);
      } else {
        Meteor.call("games.toggleJudge", this.props.game);
        Meteor.call("games.stop", this.props.game._id);
        Meteor.call("giphyUrls.getImage", this.props.game._id);
        Meteor.call("games.hideWinner", this.props.game._id);
        Meteor.call("submissions.removeData", this.props.game._id);
      }
    }, 5000);
  }

  removeGame() {
    if (this.props.game && this.props.game._id) {
      Meteor.call("submissions.removeData", this.props.game._id);
      Meteor.call("games.removeGame", this.props.game._id);
    }
  }

  getImage() {
    Meteor.call("giphyUrls.getImage", this.props.game._id);
  }

  // componentWillMount() {
  //   this.props.currentUser && this.dataInput.focus();
  // }

  render() {
    let judge;
    if (this.props.game) {
      judge = this.props.game.users[0].id;
    }

    let gameWinner = this.props.game
      ? this.props.game.users.find(user => user.score > 1)
      : null;

    console.log("SubMitPage/index.js > this.props.game", this.props.game);

    return this.props.game && !this.props.game.over ? (
      <div className="submit-page-wrapper">
        <div className="login-wrapper">
          <AccountsUI />
        </div>
        {this.props.currentUserId !== judge && !this.props.game.started ? (
          <div className="loadhold">
            <img
              className="holdon"
              alt={"Loading-hold"}
              src={
                // "https://thumbs.gfycat.com/BelatedWindyCentipede-max-1mb.gif" Elon
                // "https://media1.tenor.com/images/7a9ae83463ac644fae025eaae5c8768d/tenor.gif?itemid=8137743" Trump
                "https://i1.wp.com/the-barnburner.com/wp-content/uploads/2018/02/laughter.gif?resize=390%2C277&ssl=1"
                // "https://media1.tenor.com/images/c26a081912a71af8d0e57799c291ced5/tenor.gif?itemid=8524221" Tom Hanks
              }
            />
            <p>Waiting for your host to start the round...</p>
          </div>
        ) : null}

        {this.props.game &&
          this.props.captions.length >= this.props.game.users.length - 1 &&
          this.props.game.started &&
          !this.props.game.displayWinner ? (
            <ul>
              {this.props.captions.length > 0 ? (
                this.props.captions
                  .filter(cap => cap.game === this.props.match.params.id)
                  .map((caption, index) => (
                    <Caption
                      item={caption}
                      key={index}
                      pickWinner={this.pickWinner.bind(this, caption)}
                    />
                  ))
              ) : (
                  <p className="randomtext">No captions yet...</p>
                )}
            </ul>
          ) : null}

        {(this.props.currentUserId === judge &&
          !this.props.game.displayWinner) ||
          (!this.props.game.displayWinner && this.props.game.started) ? (
            <Giphy
              url={this.props.currentGiphyUrl && this.props.currentGiphyUrl.url}
            />
          ) : null}
        {this.props.currentUserId !== judge &&
          this.props.game.started &&
          !this.props.captions.find(
            cap => cap.owner === this.props.currentUserId
          ) ? (
            <div className="add-data">
              <CaptionField
                handleSubmit={this.addData}
                input={ref => (this.dataInput = ref)}
                hidden={this.state.hidden}
              />
            </div>
          ) : null}
        {/* this.props.game.started */}
        {judge === this.props.currentUserId &&
          !this.props.game.displayWinner ? (
            <div className="gameon">
              {this.props.game && !this.props.game.started ? (
                <GifButton handleClick={this.getImage} />
              ) : null}
              {/* Let's get Giffy With It */}
              {this.props.game.users.length > 0 &&
                (this.props.game && !this.props.game.started) ? (
                  <StartRoundButton handleClick={this.gameStart} />
                ) : !this.props.game.users.length > 0 ? (
                  <p>
                    Need {3 - this.props.game.users.length} more player(s) to start
                    the round.
              </p>
                ) : (
                    <h2>GAME ON!</h2>
                  )}
            </div>
          ) : null}
        {this.state.revealButton ? (
          <EndRoundButton
            handleWin={this.increaseScore}
            handleMistake={this.removeWinner}
          />
        ) : null}
        {this.props.winners[0] && this.props.game.displayWinner ? (
          <div className="gangster">
            <p>
              {this.props.winners[0] ? this.props.winners[0].username : null} is
              the original gangster of gifs!
            </p>
            <img
              className="loading"
              alt={"Loading-gif"}
              src={
                "https://loading.io/spinners/wave/lg.wave-ball-preloader.gif"
              }
            />
          </div>
        ) : null}
      </div>
    ) : (
        <div>
          <div>
            {this.props.game
              ? ` ${gameWinner.username} is Gif Champion of the universe!`
              : null}
            <Link to="/">
              {this.props.game && this.props.game._id ? null : (
                <button className="morebutton" onClick={this.removeGame}>
                  Let's Gif More!
              </button>
              )}
            </Link>
          </div>
        </div>
      );
  }
} // End class SubmitPage
SubmitPage.defaultProps = {
  data: []
};
SubmitPage.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
};
export default withTracker(({ match }) => {
  const handle = Meteor.subscribe("giphyUrls");
  const handleSubmissions = Meteor.subscribe("submissions");
  const handleGame = Meteor.subscribe("games");
  const handleWinners = Meteor.subscribe("winners");
  const url = GiphyUrls.findOne({ game: match.params.id });
  const captions = Submissions.find({}).fetch();
  const game = Games.findOne({ _id: match.params.id });
  const winners = Submissions.find({ winner: true }).fetch();
  const theWinners = Winners.find({}).fetch();
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url,
    captions: captions,
    game: game,
    winners: winners,
    theWinners: theWinners
  };
})(SubmitPage);
