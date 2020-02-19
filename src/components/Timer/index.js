import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

class Timer extends React.Component {
  render() {
    return (
      <div className="timer">
        <span>время</span>
        <span>сегодняшняя дата</span>
      </div>
    );
  }
}

export default Timer;
