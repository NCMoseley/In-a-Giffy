import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

// import Material UI components
import { MenuItem, RaisedButton, FlatButton } from "material-ui";
import Paper from "material-ui/Paper";
// import FlatButton from "material-ui/FlatButton";

// import collections
import { Games } from "/imports/api/games";
import { Submissions } from "/imports/api/submissions";

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import CaptionField from "/imports/ui/components/CaptionField";
import DataItem from "/imports/ui/components/DataItem/index";

class FrontPage extends Component {
  constructor() {
    super();

    this.createNewGame = this.createNewGame.bind(this);
  }

  createNewGame() {
    Meteor.call("games.create");
  }

  render() {
    return (
      <div className="content-wrapper">
        <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />

        <Link to="/gamelisttest">
          <button onClick={this.createNewGame}>Create New Game</button>
        </Link>

        <Link to="/gamelisttest">
          <button>Join Game</button>
        </Link>
      </div>
    );
  }
} // End class FrontPage

export default withTracker(() => {
  const games = Games.find({}).fetch();
  return {
    // not sure if we need this, but I gotta put something cause it won't let you return null
    currentGame: null
  };
})(FrontPage);
