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
    const monthsName = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря"
    ];

    const monthNumber = this.props.today.getMonth();
    const currentMonthName = monthsName.find((nameMonth, index) => {
      if (index === monthNumber) {
        return nameMonth;
      }
    });
    const day = this.props.today.getDate();
    const year = this.props.today.getFullYear();
    const currentDate = `${day} ${currentMonthName.toLowerCase()} ${year} `;

    return (
      <div className="timer">
        <span>{this.props.time}</span>
        <span>{currentDate}</span>
      </div>
    );
  }
}

export default Timer;
