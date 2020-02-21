import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import moment from "moment";
moment.locale("ru");

class Timer extends React.Component {
  render() {
    const currentDate = moment(this.props.today).format("LL");

    /*   console.log(this.props.time); */
    return (
      <div className="timer">
        <span>{this.props.time}</span>
        <span>{currentDate}</span>
      </div>
    );
  }
}

export default Timer;
