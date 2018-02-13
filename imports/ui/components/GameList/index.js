import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

// import collections
import { Games } from "/imports/api/games";

class GameList extends Component {
  constructor() {
    super();
  }

  joinGame() {
    Meteor.call("games.join"); // doesn't exist yet
  }

  render() {
    return (
      <div>
        <ul>
          <li>games list here..</li>
        </ul>
      </div>
    );
  }
}

export default GameList;
