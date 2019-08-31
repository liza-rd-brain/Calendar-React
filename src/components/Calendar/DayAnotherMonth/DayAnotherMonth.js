import React from "react";

export default class Day extends React.Component {
  render() {
    return (
      <div className="dayAnotherMonth">
        {this.props.item}
      </div>
    );
  }
}
