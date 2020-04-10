import React from "react";

import moment  from "moment";
moment.locale("ru");

function Timer(props) {
  /*  const currentDate = moment(props.today).format("LL"); */

  return (
    <div className="timer">
      <span>{props.time}</span>
      <span>{moment(props.today).format("LL")}</span>
    </div>
  );
}

export default Timer;
