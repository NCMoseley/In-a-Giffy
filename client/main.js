import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "../imports/ui/containers/App";
import "./main.css";

const InAGiffy = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

Meteor.startup(() =>
  ReactDOM.render(<InAGiffy />, document.getElementById("root"))
);
