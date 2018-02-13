import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

// import collections
import { Games } from "/imports/api/games";

class GameList extends Component {
  constructor() {
    super();

    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(game) {
    Meteor.call("games.join", game); // doesn't exist yet
  }

  render() {
    console.log(this.props.games);
    return (
      <div className="app-wrapper">
        <ul>
          {this.props.games.length > 0 ? (
            this.props.games.map((game, index) => (
              <li>
                <button
                  game={game._id}
                  onClick={this.joinGame.bind(this, game)}
                >{`Game ${game._id} hosted by ${game.host}`}</button>
              </li>
            ))
          ) : (
            <li>No games to display</li>
          )}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  const gameList = Meteor.subscribe("games");
  const games = Games.find({}).fetch();
  return {
    games: games
  };
})(GameList);
