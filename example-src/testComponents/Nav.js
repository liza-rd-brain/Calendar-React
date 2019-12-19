import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav" onClick={this.props.click}>
        {this.props.textLink}
      </div>
    );
  }
}

export default Nav;
