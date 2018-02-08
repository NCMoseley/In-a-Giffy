import React, { Component } from "react";
import PropTypes from "prop-types";

// import { MenuItem, RaisedButton } from "material-ui";
import Paper from "material-ui/Paper";
import "./styles.css";

import { withTracker } from "meteor/react-meteor-data";
import AccountsUI from "../../components/AccountUIWrapper/index";
import DataItem from "../../components/DataItem/index";
import Counter from "../../components/Counter";
import ClearButton from "../../components/ClearButton";
import { dataFields } from "../../../api/logic";

class App extends Component {
  constructor() {
    super();

    this.addData = this.addData.bind(this);
    this.removeCompleted = this.removeCompleted.bind(this);
  }

  // toggle the checkbox to denote completion status
  toggleComplete(item) {
    Meteor.call("data.toggleComplete", item);
  }

  // add a new to do to the list
  addData(event) {
    event.preventDefault();
    if (this.dataInput.value) {
      Meteor.call("data.addData", this.dataInput.value);
      this.dataInput.value = "";
    }
  }

  // remove a to do from the list
  removeData(item) {
    Meteor.call("data.removeData", item);
  }

  // remove all completed to dos from the list
  removeCompleted() {
    Meteor.call("data.removeCompleted", this.props.currentUserId);
  }

  // check if any of the data are completed
  hasCompleted() {
    let completed = this.props.data.filter(data => data.complete);
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    this.props.currentUser && this.dataInput.focus();
  }

  render() {
    let number = this.props.data.length;

    return (
      <div className="app-wrapper">
        <Paper
          zdepth={5}
          style={{ backgroundColor: "transparent", width: "60vw" }}
        >
          <div className="login-wrapper">
            <AccountsUI />
          </div>
          <div className="data-list">
            <h1>IN-A-GIFFY</h1>
            <div className="data-admin">
              <Counter number={number} />
              {this.hasCompleted() && (
                <ClearButton removeCompleted={this.removeCompleted} />
              )}
            </div>

            {this.props.currentUser ? (
              <div>
                <div className="data-container">
                  {this.props.data.map((data, index) => (
                    <DataItem
                      key={index}
                      item={data}
                      toggleComplete={this.toggleComplete.bind(this, data)}
                      removeData={this.removeData.bind(this, data)}
                    />
                  ))}
                </div>
                <div className="add-data">
                  <form name="addData" onSubmit={this.addData}>
                    <input type="text" ref={ref => (this.dataInput = ref)} />
                    <span>(press enter to add) </span>
                  </form>
                </div>
              </div>
            ) : (
              <div className="logged-out-message">
                <p>Please sign in to see your data.</p>
              </div>
            )}
          </div>{" "}
        </Paper>
      </div>
    );
  }
}

App.defaultProps = {
  data: []
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
};

export default withTracker(() => {
  Meteor.subscribe("data");

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    data: dataFields.find({}).fetch()
  };
})(App);
