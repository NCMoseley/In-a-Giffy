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

class SubmitPage extends Component {
  constructor() {
    super();
    this.state = {
      start: false
    };

    this.addData = this.addData.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.removewinnerd = this.removewinnerd.bind(this);
    this.getImage();
  }

  // toggle the checkbox to denote completion status
  togglewinner(item) {
    Meteor.call("data.togglewinner", item);
  }

  //appending game on text to notify players game is on
  gameStart() {
    this.setState({
      start: !this.state.start
    });
  }

  // adding a new caption

  addData(event) {
    event.preventDefault();
    setTimeout(() => {
      console.log(this.dataInput.value);
      if (this.dataInput.value) {
        Meteor.call("submissions.addData", this.dataInput.value);
        this.dataInput.value = "";
      }
      this.setState({
        start: false
      });
    }, 10000);
  }

  getJudge() {}

  // remove a to do from the list
  removeData(item) {
    Meteor.call("data.removeData", item);
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
    // console.log(this.props.captions[0]);
    let judge;
    if (this.props.users[0]) {
      judge = this.props.users[0].users[0];
    }
    // console.log(judge);
    // console.log(this.props.currentUserId);
    this.state.start && console.log("hello world");
    return (
      <div>
        <ul>
          {this.props.captions.length > 0 ? (
            this.props.captions.map((caption, index) => (
              <Caption item={caption} key={index} />
            ))
          ) : (
            <p> No caption to display </p>
          )}
        </ul>
        {this.props.currentUserId === judge ||
        (this.props.currentUserId !== judge && this.state.start) ? (
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

            {this.state.start && <h1> Game On! </h1>}
          </div>
        ) : null}

        {judge === this.props.currentUserId ? (
          <div>
            <StartButton handleClick={() => this.getImage()} />
            <StartRoundButton handleClick={this.gameStart} />
          </div>
        ) : null}
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

export default withTracker(() => {
  const handle = Meteor.subscribe("giphyUrls");
  const handleSubmissions = Meteor.subscribe("submissions");
  const handleGame = Meteor.subscribe("games");
  const url = GiphyUrls.findOne();
  const captions = Submissions.find({}).fetch();
  const users = Games.find({}).fetch();
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url,
    captions: captions,
    users: users
  };
})(SubmitPage);
