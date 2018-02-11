import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

// import Material UI components
import { MenuItem, RaisedButton, FlatButton } from "material-ui";
import Paper from "material-ui/Paper";
// import FlatButton from "material-ui/FlatButton";

// import app components
import { Submissions } from "/imports/api/submissions";
import CaptionField from "/imports/ui/components/CaptionField";
import { gameRounds } from "/imports/api/gameround";
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import DataItem from "/imports/ui/components/DataItem/index";

class FrontPage extends Component {
  constructor() {
    super();
  }

  onClickCreateNewGame() {
    Meteor.call("gameRounds.Create");
  }

  render() {
    return (
      <div className="frontpage-wrapper">
        <div>
          <div className="frontpage">
            <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />

            {/* <button onClick={onClickCreateNewGame()}>Create New Game</button> onClickCreateNewGame is not defined*/}
            <Paper>Create a New Game!</Paper>
            <button>Join a Game</button>
          </div>{" "}
        </div>
      </div>
    );
  }
} // End class FrontPage

export default FrontPage;
