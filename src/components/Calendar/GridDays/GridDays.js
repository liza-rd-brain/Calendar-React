import React from "react";
import Day from "./Day/Day";

export default class GridDays extends React.Component {
  render() {
    const todayDay = this.props.today.getDate();
    const todayMonth = this.props.today.getMonth();
    const todayYear = this.props.today.getFullYear();

    const currYear = this.props.year;
    const currMonth = this.props.month;

    const firstDayCurrMonth = new Date(2019, currMonth, 1);
    const lastDayCurrMonth = new Date(2019, currMonth + 1, 0).getDate();

    let listCurrMonth = [];
    let dayNumber = 1;

    while (dayNumber <= lastDayCurrMonth) {
      let className = "dayCurrentMonth day";
      todayDay === dayNumber &&
      todayMonth === currMonth &&
      todayYear === currYear
        ? (className += " today")
        : "";
      listCurrMonth.push({ number: dayNumber, class: className });
      dayNumber++;
    }

    const firstDayCurrMonthOfWeek = firstDayCurrMonth.getDay();

    let amountPrevMohthDays;
    switch (firstDayCurrMonthOfWeek) {
      case 1:
        break;
      case 0:
        amountPrevMohthDays = 6;
        break;
      default:
        amountPrevMohthDays = firstDayCurrMonthOfWeek - 1;
        break;
    }

    const lastDayPrevMonth = new Date(2019, currMonth, 0).getDate();
    const firstDayPrevMonth = lastDayPrevMonth - amountPrevMohthDays + 1;
    let dayNumberPrevMonth = firstDayPrevMonth;
    let listPrevMonth = [];

    while (dayNumberPrevMonth <= lastDayPrevMonth) {
      listPrevMonth.push({ number: dayNumberPrevMonth, class: "another day" });
      dayNumberPrevMonth++;
    }

    const listPrevCurrentMonth = listPrevMonth.concat(listCurrMonth);
    const amountNextMohthDays = 42 - listPrevCurrentMonth.length;

    let listNextMonth = [];
    let dayNumberNextMonth = 1;

    while (dayNumberNextMonth < amountNextMohthDays + 1) {
      listNextMonth.push({ number: dayNumberNextMonth, class: "another day" });
      dayNumberNextMonth++;
    }

    const listAllMonth = listPrevCurrentMonth.concat(listNextMonth);
    const arrayGrid = listAllMonth.map(item => {
      return (
        <Day
          key={item.number + item.class}
          item={item.number}
          class={item.class}
          onItemClick={this.props.onItemClick}
        />
      );
    });

    return <div className="grid">{arrayGrid}</div>;
  }
}
