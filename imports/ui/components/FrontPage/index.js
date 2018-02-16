import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
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
    this.state = { name: `${Meteor.user().username}'s Game` };
  }

  handleInputChange(e) {
    this.setState({ name: e.target.value });
  }

  createNewGame(event) {
    event.preventDefault();

    Meteor.call("games.create", this.state.name, (err, gameId) => {
      if (err) {
        console.log("Create game no work?");
      } else {
        this.props.history.push(`submitpagetest/${gameId}`);
      }
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />

        <form name="gameName" onSubmit={this.createNewGame}>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.handleInputChange(e)}
          />
          <br />
          <button>Start a New Game</button>
        </form>

        <Link to="/gamelisttest">
          <button>Join a Game</button>
        </Link>
      </div>
    );
  }
} // End class FrontPage

export default withRouter(
  withTracker(() => {
    // const games = Games.find({}).fetch();
    return {
      // not sure if we need this, but I gotta put something cause it won't let you return null
      currentGame: null
    };
  })(FrontPage)
);
