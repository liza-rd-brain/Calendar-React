import React from "react";

export default class TaskTitle extends React.Component {
  render() {
    /*  debugger; */
    const nameDayList = [
      "воскресение",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота"
    ];
    debugger;
    const numberDay = new Date(
      this.props.year,
      this.props.month,
      this.props.selectDay
    ).getDay();

    const nameDay = nameDayList.find((el, i) => numberDay === i);

    const titleText =
      this.props.selectDay === this.props.today.getDate()
        ? "Сегодня"
        : `${nameDay} ${this.props.selectDay} `;

    return <div className="taskTitle">{titleText}</div>;
  }
}
