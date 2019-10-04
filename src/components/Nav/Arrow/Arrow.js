import React, { Component } from "react";

class Arrow extends Component {
  render() {
    return (
      <div className="arrow" onClick={this.props.onClick}>
        -
      </div>
    );
  }
}

export default Arrow;
