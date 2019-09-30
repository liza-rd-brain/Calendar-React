import React from "react";

export default class Month extends React.Component {
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

    const monthNumber = this.props.month;
    const currentMonthName = monthsName.find((nameMonth, index) => {
      if (index === monthNumber) {
        return nameMonth;
      }
    });

    return (
      <div
        className="month"
        onClick={() => {
          console.log("click");
        }}
      >{`${currentMonthName || ""} ${this.props.year} `}</div>
    );
  }
}
