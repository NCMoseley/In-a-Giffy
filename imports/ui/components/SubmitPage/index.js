import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
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
import DataItem from "/imports/ui/components/DataItem";
import Giphy from "/imports/ui/components/Giphy"; // import Giphy front-end component
import StartButton from "/imports/ui/components/StartButton";
import StartRoundButton from "/imports/ui/components/StartRoundButton";
import Remove from "/imports/ui/components/Remove";
import EndRoundButton from "/imports/ui/components/EndRoundButton";

class SubmitPage extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      revealButton: false
    };

    this.addData = this.addData.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.removewinnerd = this.removewinnerd.bind(this);
    this.removeCaptions = this.removeCaptions.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getWinners = this.getWinners.bind(this);
    this.increaseScore = this.increaseScore.bind(this);
    this.removeWinner = this.removeWinner.bind(this);
    this.toggleJudge = this.toggleJudge.bind(this);
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

  toggleJudge() {
    Meteor.call("games.toggleJudge", this.props.game);
  }

  // adding a new caption

  addData(event) {
    event.preventDefault();

    console.log(this.dataInput.value);
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
    Meteor.call("submissions.removeData");
    this.setState({
      revealButton: !this.state.revealButton
    });
  }

  // remove a to do from the list
  removeCaptions() {
    Meteor.call("submissions.removeData");
  }

  // remove all winnerd to dos from the list
  removewinnerd() {
    Meteor.call("data.removewinnerd", this.props.currentUserId);
  }

  // check if any of the data are winnerd
  haswinnerd() {
    let winnerd = this.props.data.filter(data => data.winner);
    return winnerd.length > 0 ? true : false;
  }

  getImage() {
    Meteor.call("giphyUrls.getImage", this.props.game._id);
  }

  // componentDidMount() {
  //   this.props.currentUser && this.dataInput.focus();
  // }

  render() {
    // console.log(this.props.winners[0] ? this.props.winners[0].owner : null);

    // console.log(this.props.game ? this.props.game.users : null);

    // console.log(this.props.winners);

    if (this.props.game) {
      if (this.props.game.users.length === this.props.captions.length) {
        console.log("it worked");
      }
    }

    let judge;
    if (this.props.game) {
      judge = this.props.game.users[0].id;
    }
    console.log(judge);
    // console.log(this.props.currentUserId);

    return (
      <div className="submit-page-wrapper">
        {this.props.game &&
        this.props.game.users.length >= this.props.captions.length - 1 ? (
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
              <p> No caption to display </p>
            )}
          </ul>
        ) : null}
        {this.props.currentUserId === judge ||
        (this.props.currentUserId !== judge && this.props.game
          ? this.props.game.started
          : null) ? (
          <Giphy
            url={this.props.currentGiphyUrl && this.props.currentGiphyUrl.url}
          />
        ) : null}

        {this.props.currentUserId !== judge ? (
          <div className="add-data">
            <CaptionField
              handleSubmit={this.addData}
              input={ref => (this.dataInput = ref)}
              hidden={this.state.hidden}
            />
            {/* <button onClick={this.getWinners}> working? </button> */}
          </div>
        ) : null}

        {judge === this.props.currentUserId ? (
          <div>
            <StartButton handleClick={this.getImage} />
            <StartRoundButton handleClick={this.gameStart} />
          </div>
        ) : null}
        <Remove handleClick={this.removeCaptions} />
        {this.state.revealButton ? (
          <EndRoundButton
            handleWin={this.increaseScore}
            handleMistake={this.removeWinner}
          />
        ) : null}
        <button onClick={this.toggleJudge}>Test judge toggle</button>
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
