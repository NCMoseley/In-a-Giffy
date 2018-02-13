import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import "./main.css";

// import components
import App from "/imports/ui/containers/App";
import FrontPage from "/imports/ui/components/FrontPage";
import GameRound from "/imports/ui/components/GameRound/index";
import SubmitPage from "/imports/ui/components/SubmitPage";

const InAGiffy = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/frontpagetest" component={FrontPage} />
      <Route exact path="/submitpagetest" component={SubmitPage} />
      <Route exact path="/gameroundtest" component={GameRound} />
    </Switch>
  </Router>
);

Meteor.startup(() =>
  ReactDOM.render(<InAGiffy />, document.getElementById("root"))
);
