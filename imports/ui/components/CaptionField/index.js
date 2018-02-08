import React from "react";

export default class CaptionField extends React.Component {
  render() {
    return (
      <div>
        <form name="addData" onSubmit={this.props.handleSubmit}>
          <input type="text" ref={this.props.input} />
          <span>(press enter to add) </span>
        </form>
      </div>
    );
  }
}
