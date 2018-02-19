import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import "./main.css";

// import components
import App from "/imports/ui/containers/App";
import FrontPage from "/imports/ui/components/FrontPage";
import GameList from "/imports/ui/components/GameList";
import GameRound from "/imports/ui/components/GameRound";
import SubmitPage from "/imports/ui/components/SubmitPage";

const InAGiffy = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/play/:id" component={SubmitPage} />

      <Route exact path="/join" component={GameList} />
    </Switch>
  </Router>
);

Meteor.startup(() =>
  ReactDOM.render(<InAGiffy />, document.getElementById("root"))
);
