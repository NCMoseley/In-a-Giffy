import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// import collections
import { Games } from "/imports/api/games";

// import components
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";

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
        <div className="login-wrapper">
          <AccountsUI />
        </div>
        < div >
          <h1>Join a Game</h1>
          <ul>
            {this.props.games.length > 0 ? (
              this.props.games.map((game, index) => (
                <li key={game._id}>
                  <Link to={`/play/${game._id}`}>
                    <button
                      game={game._id}
                      onClick={this.joinGame.bind(this, game)}
                    >{`"${game.gameName}" hosted by ${
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

export default withRouter(
  withTracker(() => {
    const gameList = Meteor.subscribe("games");
    const games = Games.find({}).fetch();
    return {
      games: games
    };
  })(GameList)
);
