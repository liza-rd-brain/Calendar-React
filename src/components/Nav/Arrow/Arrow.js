import React, { Component } from "react";

class Arrow extends Component {
  render() {
    return (
      <div className="arrow" onClick={this.props.onArrowClick}>
        -
      </div>
    );
  }
}

export default Arrow;
