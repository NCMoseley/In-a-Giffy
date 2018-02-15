import React from "react";
import { Games } from "/imports/api/games";

class CaptionField extends React.Component {
  render() {
    return (
      <div>
        <form name="addData" onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            ref={this.props.input}
            hidden={this.props.hidden}
          />
          <button hidden={this.props.hidden} onClick={this.props.start}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CaptionField;

// export default withTracker(() => {
//   const handleGame = Meteor.subscribe("games");
//   const users = Games.find({}).fetch();
//   return {
//     currentUserId: Meteor.userId(),

//     users: users
//   };
// })(CaptionField);
