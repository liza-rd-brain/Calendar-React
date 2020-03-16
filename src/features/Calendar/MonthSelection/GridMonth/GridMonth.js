import React, { Component } from "react";

class GridMonth extends Component {
  /*  shouldComponentUpdate(nextProps) {
    if (nextProps.date) {
      return nextProps.date === this.props.date;
    } else {
      return nextProps.today === this.props.today;
    }
  } */
  render() {
    let currDate = this.props.date || this.props.today;
    const todayYear = currDate.getFullYear();
    const todayMonth = currDate.getMonth();
    const currYear = this.props.today.getFullYear();
    const currMonth = this.props.today.getMonth();
    const monthsList = [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек"
    ];

    const monts = monthsList.map((name, i) => {
      let nameMonth = "nameMonth";
      todayMonth === i && todayYear === currYear
        ? (nameMonth += " currMonth")
        : "";
      return (
        <div
          key={name}
          id={name}
          className={nameMonth}
          onClick={() => this.props.onItemClick(i)}
        >
          {name}
        </div>
      );
    });
    return <div className="grid">{monts}</div>;
  }
}

export default GridMonth;
