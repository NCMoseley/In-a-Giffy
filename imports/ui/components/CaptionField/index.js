import React from "react";

export default class CaptionField extends React.Component {
  render() {
    return (
      <div>
        <form name="addData" onSubmit={this.props.handleSubmit}>
          <input type="text" ref={ref => (this.dataInput = ref)} />
          <span>(press enter to add) </span>
        </form>
      </div>
    );
  }
}
