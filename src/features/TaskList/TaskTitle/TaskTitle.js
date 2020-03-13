import React from "react";

export default class TaskTitle extends React.Component {
  render() {
    const nameDayList = [
      "воскресение",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота"
    ];

    const numberDay = new Date(
      this.props.year,
      this.props.month,
      this.props.selectDay.getDate()
    ).getDay();

    const nameDay = nameDayList.find((el, i) => numberDay === i);
    /* ; */
    const titleText =
      this.props.selectDay.getDate() === this.props.today.getDate() &&
      this.props.selectDay.getMonth() === this.props.today.getMonth() &&
      this.props.selectDay.getFullYear() === this.props.today.getFullYear()
        ? "Сегодня"
        : `${nameDay} ${this.props.selectDay.getDate()} `;

    return <div className="taskTitle">{titleText}</div>;
  }
}
