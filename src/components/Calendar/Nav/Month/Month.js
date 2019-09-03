import React, { Component } from "react";

class Month extends Component {
  render() {
    const monthsName = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ];

    const month = this.props.month;
    /*  const monthNumber = today.getMonth(); */

    const currentMonthName = monthsName.find((item, index) => {
      if (index === month) {
        return item;
      }
    });
    return (
      <div className="month">{`${currentMonthName}, ${this.props.year}`}</div>
    );
  }
}

export default Month;
