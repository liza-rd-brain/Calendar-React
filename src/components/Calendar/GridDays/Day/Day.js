import React from "react";

export default class Day extends React.Component {
  render() {
    return (
      <div
        className={this.props.class}
        onClick={() => this.props.onItemClick(this.props.item)}
      >
        {this.props.item}
      </div>
    );
  }
}
