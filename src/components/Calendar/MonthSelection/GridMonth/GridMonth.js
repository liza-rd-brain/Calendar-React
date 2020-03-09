import React, { Component } from "react";

class GridMonth extends Component {
  render() {
    const todayYear = this.props.today.getFullYear();
    const todayMonth = this.props.today.getMonth();
    const currYear = this.props.year;
    const currMonth = this.props.month;
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
