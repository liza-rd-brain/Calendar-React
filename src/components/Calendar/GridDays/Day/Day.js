import React from "react";

export default class Day extends React.Component {
  render() {
    return (
      <div className={this.props.class}>
        {this.props.item}
      </div>
    );
  }
}
