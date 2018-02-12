import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./styles.css";

// import components
import Giphy from "/imports/ui/components/Giphy"; // import Giphy front-end component
import { GiphyUrls } from "/imports/api/giphy"; // import Giphy back-end collection
import StartButton from "/imports/ui/components/StartButton";
import { Submissions } from "/imports/api/submissions";
import CaptionField from "/imports/ui/components/CaptionField";
import { gameRounds } from "/imports/api/gameround";
import AccountsUI from "/imports/ui/components/AccountUIWrapper/index";
import DataItem from "/imports/ui/components/DataItem/index";
import Caption from "../Caption";

class SubmitPage extends Component {
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

    Meteor.call("submissions.addData", this.dataInput.value);
  }

  // addData(event) {
  //   event.preventDefault();
  //   console.log(this.dataInput.value);
  //   if (this.dataInput.value) {
  //     Meteor.call("submissions.addData", this.dataInput.value);
  //     this.dataInput.value = "";
  //   }
  // }

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
    console.log(this.props.captions);
    return (
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
            input={ref => (this.dataInput = ref)} //?
          />
        </div>

        <ul>
          {this.props.captions.length > 0
            ? this.props.captions.map((caption, index) => {
                <Caption item={caption} key={index} />;
              })
            : null}
        </ul>

        <Giphy
          url={this.props.currentGiphyUrl && this.props.currentGiphyUrl.url}
        />
        <StartButton handleClick={() => this.getImage()} />
      </div>
    );
  }
} // End class SubmitPage

SubmitPage.defaultProps = {
  data: []
};

SubmitPage.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
};

export default withTracker(() => {
  const handle = Meteor.subscribe("giphyUrls");
  const handleSubmissions = Meteor.subscribe("submissions");
  const url = GiphyUrls.findOne();
  const captions = Submissions.find({}).fetch();
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    currentGiphyUrl: url,
    captions: captions
  };
})(SubmitPage);
