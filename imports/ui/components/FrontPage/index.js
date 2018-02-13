import React, { Component } from "react";
import PropTypes from "prop-types";

// import Material UI components
import { MenuItem, RaisedButton, FlatButton } from "material-ui";
import Paper from "material-ui/Paper";
// import FlatButton from "material-ui/FlatButton";

// import collections
import { gameRounds } from "/imports/api/gameround";
import { Submissions } from "/imports/api/submissions";

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import CaptionField from "/imports/ui/components/CaptionField";
import DataItem from "/imports/ui/components/DataItem/index";

class FrontPage extends Component {
  constructor() {
    super();
  }

  // createNewGame() {
  //   Meteor.call("Games.play");
  // }

  // joinGame() {
  //   Meteor.call("Games.play");
  // }

  render() {
    return (
      <div className="content-wrapper">
        <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />

        {/* <button onClick={createNewGame()}>Create New Game</button> */}
        <button>Place Holder Create</button>
        {/* <button onClick={joinGame()}>Join Game</button> */}
        <button>Place Holder Join</button>
      </div>
    );
  }
} // End class FrontPage

export default FrontPage;
