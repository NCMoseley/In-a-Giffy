import React from "react";
import { Games } from "/imports/api/games";
import { withTracker } from "meteor/react-meteor-data";

class CaptionField extends React.Component {
  render() {
    console.log(this.props.users);
    console.log(this.props.currentUserId);

    let judge;
    if (this.props.users[0]) {
      judge = this.props.users[0].users[0];
    }

    return (
      <div>
        <form name="addData" onSubmit={this.props.handleSubmit}>
          {this.props.currentUserId !== judge ? (
            <input type="text" ref={this.props.input} />
          ) : null}
          {this.props.currentUserId === judge ? (
            <button onClick={this.props.start}>Submit</button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default withTracker(() => {
  const handleGame = Meteor.subscribe("games");
  const users = Games.find({}).fetch();
  return {
    currentUserId: Meteor.userId(),

    users: users
  };
})(CaptionField);
