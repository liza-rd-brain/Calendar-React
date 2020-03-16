import React from "react";
import moment from "moment";

function Timer(props) {
  const currentDate = moment(props.today).format("LL");
  
  return (
    <div className="timer">
      <span>{props.time}</span>
      <span>{currentDate}</span>
    </div>
  );
}

export default Timer;
