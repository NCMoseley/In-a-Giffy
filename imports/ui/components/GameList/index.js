import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter, Link } from "react-router-dom";
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
      <div className="content-wrapper">
        <div>
          <ul>
            {this.props.games.length > 0 ? (
              this.props.games.map((game, index) => (
                <li>
                  <Link to={`/submitpagetest/${game._id}`}>
                    <button
                      game={game._id}
                      onClick={this.joinGame.bind(this, game)}
                    >{`Game ${game._id} hosted by ${
                      game.host.username
                    }`}</button>
                  </Link>
                </li>
              ))
            ) : (
              <li>No games to display</li>
            )}
          </ul>
        </div>
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
