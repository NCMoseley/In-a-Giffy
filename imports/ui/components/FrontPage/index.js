import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";
// import Material UI resources
// import { MenuItem, RaisedButton } from "material-ui";
import Paper from "material-ui/Paper";
// import { withTracker } from "meteor/react-meteor-data";
import AccountsUI from "../AccountUIWrapper/index";
import DataItem from "../DataItem/index";
// import Counter from "../../components/Counter";
// import ClearButton from "../../components/ClearButton";
import { Submissions } from "../../../api/submissions";
import CaptionField from "../CaptionField/index";
import { gameRounds } from "../../../api/gameround";

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
            <button>Create a New Game!</button>
            <button>Join a Game</button>
          </div>{" "}
        </div>
      </div>
    );
  }
} // End class FrontPage

export default FrontPage;
