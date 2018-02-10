import React, { Component } from "react";
import PropTypes from "prop-types";
import Giphy from "../../components/Giphy"; // import Giphy front-end component
import { GiphyUrls } from "/imports/api/giphy"; // import Giphy back-end collection
import StartButton from "../../components/StartButton";
// import local style resources
import "./styles.css";

import { withTracker } from "meteor/react-meteor-data";
import AccountsUI from "../../components/AccountUIWrapper/index";
import DataItem from "../../components/DataItem/index";
// import Counter from "../../components/Counter";
// import ClearButton from "../../components/ClearButton";
import { Submissions } from "../../../api/submissions";
import CaptionField from "../../components/CaptionField";

class App extends Component {
  constructor() {
    super();

    this.addData = this.addData.bind(this);
    this.removewinnerd = this.removewinnerd.bind(this);
    this.getImage();
  }

  // toggle the checkbox to denote completion status
  togglewinner(item) {
    Meteor.call("data.togglewinner", item);
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

  // remove all winnerd to dos from the list
  removewinnerd() {
    Meteor.call("data.removewinnerd", this.props.currentUserId);
  }

  // check if any of the data are winnerd
  haswinnerd() {
    let winnerd = this.props.data.filter(data => data.winner);
    return winnerd.length > 0 ? true : false;
  }

  getImage() {
    Meteor.call("giphyUrls.getImage");
  }

  componentDidMount() {
    this.props.currentUser && this.dataInput.focus();
  }

  render() {
    console.log("re-render??>");
    console.log(this.props.currentGiphyUrl);
    let number = this.props.data.length;
    return (
      <div className="app-wrapper">
        <div>
          <div className="login-wrapper">
            <AccountsUI />
          </div>
          <div className="content-wrapper">
            <img className="logo" src="images/iaglogo.png" alt="In a .giffy!" />

            {this.props.currentUser ? (
              <div>
                <div className="data-container">
                  {this.props.data.map((data, index) => (
                    <DataItem
                      key={index}
                      item={data}
                      togglewinner={this.togglewinner.bind(this, data)}
                      removeData={this.removeData.bind(this, data)}
                    />
                  ))}
                </div>
                <div className="add-data">
                  <CaptionField
                    handleSubmit={this.addData}
                    input={ref => (this.dataInput = ref)}
                  />
                </div>
                <Giphy
                  url={
                    this.props.currentGiphyUrl && this.props.currentGiphyUrl.url
                  }
                />
                <StartButton handleClick={() => this.getImage()} />
              </div>
            ) : (
              <div className="logged-out-message">
                <p>A party game of .gifs and funny captions.</p>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    );
  }
} // End class App

App.defaultProps = {
  data: []
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
};

export default withTracker(() => {
  const handle = Meteor.subscribe("giphyUrls");
  const url = GiphyUrls.findOne();
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url
  };
})(App);
