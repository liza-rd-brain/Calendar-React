import React from "react";

export default class Day extends React.Component {
  render() {
    const today = this.props.item;
    return (
      <div className="day">
        {this.props.item}
      </div>
    );
  }
}
