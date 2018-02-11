import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";

import Giphy from "/imports/api/giphy";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "../imports/ui/containers/App";
import GameRound from "../imports/ui/components/GameRound/index";
import "./main.css";

const InAGiffy = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/giphy" component={Giphy} />
      {/* <Route exact path="/round" component={GameRound} /> */}
    </Switch>
  </Router>
);

Meteor.startup(() =>
  ReactDOM.render(<InAGiffy />, document.getElementById("root"))
);
