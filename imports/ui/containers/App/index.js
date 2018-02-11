import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./styles.css";

// import components
import Giphy from "/imports/ui/components/Giphy"; // Giphy front-end component
import { GiphyUrls } from "/imports/api/giphy"; // Giphy back-end collection
import StartButton from "/imports/ui/components/StartButton";
import { Submissions } from "/imports/api/submissions";
import CaptionField from "/imports/ui/components/CaptionField";
import FrontPage from "/imports/ui/components/FrontPage";
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import DataItem from "/imports/ui/components/DataItem/index";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    console.log("re-render??>");
    console.log(this.props.currentGiphyUrl);
    let number = this.props.data.length;
    return (
      <div className="app-wrapper">
        <div>
          <div className="login-wrapper">
            <AccountsUI />
          </div>
          <div className="content-wrapper">
            {this.props.currentUser ? (
              // display this when the user logs in
              <FrontPage />
            ) : (
              // display this before the user has looged in
              <div className="logged-out-message">
                <img
                  className="logo"
                  src="images/iaglogo.png"
                  alt="In a .giffy!"
                />
                <p>A party game of .gifs and funny captions.</p>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    );
  }
} // End class App

App.defaultProps = {
  data: []
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
};

export default withTracker(() => {
  const handle = Meteor.subscribe("giphyUrls");
  const url = GiphyUrls.findOne();
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url
  };
})(App);
