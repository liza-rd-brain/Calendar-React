import React from "react";
import moment from "moment";

class Timer extends React.Component {
  render() {
    const currentDate = moment(this.props.today).format("LL");
    return (
      <div className="timer">
        <span>{this.props.time}</span>
        <span>{currentDate}</span>
      </div>
    );
  }
}

export default Timer;
