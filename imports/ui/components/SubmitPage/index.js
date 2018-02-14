import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./styles.css";

// import collections
import { Games } from "/imports/api/games";
import { GiphyUrls } from "/imports/api/giphy";
import { Submissions } from "/imports/api/submissions";

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper";
import Caption from "/imports/ui/components/Caption";
import CaptionField from "/imports/ui/components/CaptionField";
import DataItem from "/imports/ui/components/DataItem";
import Giphy from "/imports/ui/components/Giphy"; // import Giphy front-end component
import StartButton from "/imports/ui/components/StartButton";
import StartRoundButton from "/imports/ui/components/StartRoundButton";
import Remove from "/imports/ui/components/Remove";

class SubmitPage extends Component {
  constructor() {
    super();

    this.addData = this.addData.bind(this);
    this.gameStart = this.gameStart.bind(this);
    // this.gameStart();
    // this.toggleWinner = this.toggleWinner.bind(this);
    this.removewinnerd = this.removewinnerd.bind(this);
    this.removeCaptions = this.removeCaptions.bind(this);
    this.getImage();
  }

  // toggle the checkbox to denote completion status
  toggleWinner(item) {
    Meteor.call("submissions.toggleWinner", item);
  }

  //appending game on text to notify players game is on
  gameStart() {
    Meteor.call("games.start", this.props.game._id);
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
    Meteor.call("giphyUrls.getImage");
  }

  componentDidMount() {
    this.props.currentUser && this.dataInput.focus();
  }

  render() {
    console.log(this.props.captions);
    console.log(this.props.game);

    if (this.props.game) {
      if (this.props.game.users.length === this.props.captions.length) {
        console.log("it worked");
      }
    }

    let judge;
    if (this.props.game) {
      judge = this.props.game.users[0];
    }
    // console.log(judge);
    // console.log(this.props.currentUserId);

    return (
      <div>
        {this.props.game &&
        this.props.game.users.length === this.props.captions.length ? (
          <ul>
            {this.props.captions.length > 0 ? (
              this.props.captions
                .filter(cap => cap.game === this.props.match.params.id)
                .map((caption, index) => (
                  <Caption
                    item={caption}
                    key={index}
                    toggleWinner={this.toggleWinner.bind(this, caption)}
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
            />
          </div>
        ) : null}

        {judge === this.props.currentUserId ? (
          <div>
            <StartButton handleClick={() => this.getImage()} />
            <StartRoundButton handleClick={this.gameStart} />
          </div>
        ) : null}
        <Remove handleClick={this.removeCaptions} />
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
  const url = GiphyUrls.findOne();
  const captions = Submissions.find({}).fetch();
  const game = Games.findOne({ _id: match.params.id });
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url,
    captions: captions,
    game: game
  };
})(SubmitPage);
