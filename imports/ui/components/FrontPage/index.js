import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// import Material UI components
import { MenuItem, RaisedButton, FlatButton } from "material-ui";
import Paper from "material-ui/Paper";
// import FlatButton from "material-ui/FlatButton";

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
        this.props.history.push(`play/${gameId}`);
        Meteor.call("giphyUrls.getImage", gameId);
      }
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />
        <form
          className="gameName"
          name="gameName"
          onSubmit={this.createNewGame}
        >
          <button>Start a New Game</button>
          <h3> Select a title: </h3>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.handleInputChange(e)}
          />
        </form>

        <Link to="/join">
          <div className="joinform">
            <button>Join a Game</button>
          </div>
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
