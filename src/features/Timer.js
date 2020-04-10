import React from "react";

import moment from "moment";

function Timer(props) {
  return (
    <div className="timer">
      <span>{props.time}</span>
      <span>{moment(props.today).format("LL")}</span>
    </div>
  );
}

export default Timer;
