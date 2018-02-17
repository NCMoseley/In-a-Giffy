import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./styles.css";

// import Material UI components
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// import collections
import { Games } from "/imports/api/games";
import Giphy from "../../components/Giphy"; // import Giphy front-end component
import { GiphyUrls } from "/imports/api/giphy"; // import Giphy back-end collection

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import CaptionField from "/imports/ui/components/CaptionField";
import DataItem from "/imports/ui/components/DataItem/index";
import FrontPage from "/imports/ui/components/FrontPage";
import StartButton from "/imports/ui/components/StartButton";
import { Submissions } from "/imports/api/submissions";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    // console.log("re-render??>");
    // console.log(this.props.currentGiphyUrl);
    let number = this.props.data.length;
    return (
      <div className="app-wrapper">
        <MuiThemeProvider>
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
        </MuiThemeProvider>
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
  const handle = Meteor.subscribe("giphyUrls"); // map from Mongo database to props
  const game = Meteor.subscribe("Games");
  // const url = GiphyUrls.findOne();

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    // currentGiphyUrl: url,
    currentGame: Games.find().fetch()
  };
})(App);
