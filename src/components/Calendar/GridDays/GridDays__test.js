import React from "react";
import Day from "./Day/Day";

export default class GridDays extends React.Component {
  render() {
    const todayDay = this.props.today.getDate();
    const todayMonth = this.props.today.getMonth();
    const todayYear = this.props.today.getFullYear();

    const currYear = this.props.year;
    const currMonth = this.props.month;

    const firstDayCurrMonth = new Date(currYear, currMonth, 1);
    const lastDayCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();

    const amountDaysInGrid = 42;
    const listGridDays = [];
    while (listGridDays.length < amountDaysInGrid) {
      listGridDays.push("");
    }

    const numberFirstDayCurrMonth = firstDayCurrMonth.getDay();
    debugger;
    let amountPrevMohthDays = 0;
    switch (numberFirstDayCurrMonth) {
      case 1:
        break;
      case 0:
        amountPrevMohthDays = 6;
        break;
      default:
        amountPrevMohthDays = numberFirstDayCurrMonth - 1;
        break;
    }

    const firstDayPrevMonth = new Date(
      2019,
      currMonth,
      1 - amountPrevMohthDays
    ).getDate();

    const firstDatePrevMonth = new Date(
      2019,
      currMonth,
      1 - amountPrevMohthDays
    );

    const getNextDate = date => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    };

    let startDayInGrid = firstDatePrevMonth;
    let result = listGridDays.map(item => {
      let className = "";
      todayDay === startDayInGrid.getDate() &&
      todayMonth === startDayInGrid.getMonth() &&
      todayYear === startDayInGrid.getFullYear()
        ? (className = "today")
        : todayMonth === startDayInGrid.getMonth() &&
          todayYear === startDayInGrid.getFullYear()
        ? (className = "current")
        : (className = "another");
      item = {
        number: startDayInGrid.getDate(),
        class: className,
        date: startDayInGrid
      };
      startDayInGrid = getNextDate(startDayInGrid);

      return item;
    });

    console.log(result);

    const arrayGrid = result.map(item => {
      return (
        <Day
          key={item.number + item.class}
          item={item.number}
          class={item.class}
          /*       date={item.date} */
        />
      );
    });

    return <div className="gridDays">{arrayGrid}</div>;
  }
}
