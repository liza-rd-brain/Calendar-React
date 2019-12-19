import React, { Component } from "react";
import Nav from "./Nav";
class Block_1 extends Component {
  render() {
    return (
      <div className="top-block">
        <h1>{this.props.title}</h1>

        <div>
          {" "}
          <Nav textLink="to Block_2" click={this.props.clickBlock_1} />
        </div>
      </div>
    );
  }
}
export default Block_1;
