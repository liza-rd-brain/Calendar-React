import React, { Component } from "react";
import Nav from "./Nav";
class Block_2 extends Component {
  render() {
    return (
      <div className="top-block">
        <h1>{this.props.secondTitle}</h1>
        
        <div>
          <Nav textLink="to Block_1" click={this.props.clickBlock_Home} />
          <Nav textLink="to Block_3" click={this.props.clickBlock_2} />
        </div>
      </div>
    );
  }
}

export default Block_2;
