import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";

import FrontPage from "/imports/ui/components/FrontPage";
import SubmitPage from "/imports/ui/components/SubmitPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "../imports/ui/containers/App";
import GameRound from "../imports/ui/components/GameRound/index";
import "./main.css";

const InAGiffy = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/frontpagetest" component={FrontPage} />
      <Route exact path="/submitpagetest" component={SubmitPage} />
      {/* <Route exact path="/round" component={GameRound} /> */}
    </Switch>
  </Router>
);

Meteor.startup(() =>
  ReactDOM.render(<InAGiffy />, document.getElementById("root"))
);
