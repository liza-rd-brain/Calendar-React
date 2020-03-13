import React from "react";
import Day from "./Day/Day";

function getListAllMonth(props) {
  const todayDay = props.today.getDate();
  const todayMonth = props.today.getMonth();
  const todayYear = props.today.getFullYear();

  const currYear = props.year;
  const currMonth = props.month;

  const firstDayCurrMonth = new Date(currYear, currMonth, 1);
  const lastDayCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();

  let listCurrMonth = [];
  let dayNumber = 1;

  let day = 1;
  let variableDate = new Date(currYear, currMonth, day);

  while (dayNumber <= lastDayCurrMonth) {
    let className = "dayCurrentMonth day";
    todayDay === dayNumber && todayMonth === currMonth && todayYear === currYear
      ? (className += " today")
      : "";
    listCurrMonth.push({
      number: dayNumber,
      date: variableDate,
      class: className
    });
    dayNumber++;
    variableDate = new Date(currYear, currMonth, (day += 1));
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

  /*  ; */
  const lastDayPrevMonth = new Date(2019, currMonth, 0).getDate();
  const firstDayPrevMonth = lastDayPrevMonth - amountPrevMohthDays + 1;
  let dayNumberPrevMonth = firstDayPrevMonth;
  let listPrevMonth = [];

  let dayPrev = firstDayPrevMonth;
  let variableDatePrev = new Date(currYear, currMonth - 1, dayPrev);

  while (dayNumberPrevMonth <= lastDayPrevMonth) {
    listPrevMonth.push({
      number: dayNumberPrevMonth,
      date: variableDatePrev,
      class: "another day"
    });
    dayNumberPrevMonth++;
    variableDatePrev = new Date(currYear, currMonth - 1, (dayPrev += 1));
  }

  const listPrevCurrentMonth = listPrevMonth.concat(listCurrMonth);
  const amountNextMohthDays = 42 - listPrevCurrentMonth.length;

  let listNextMonth = [];
  let dayNumberNextMonth = 1;

  let dayNext = dayNumberNextMonth;
  let variableDateNext = new Date(currYear, currMonth + 1, dayNext);

  while (dayNumberNextMonth < amountNextMohthDays + 1) {
    listNextMonth.push({
      number: dayNumberNextMonth,
      date: variableDateNext,
      class: "another day"
    });
    dayNumberNextMonth++;
    variableDateNext = new Date(currYear, currMonth + 1, (dayNext += 1));
  }

  return listPrevCurrentMonth.concat(listNextMonth);
}

export default class GridDays extends React.Component {
  render() {
    const listAllMonth = getListAllMonth(this.props);
    return (
      <div className="grid">
        {listAllMonth.map(item => (
          <Day
            key={item.number + item.class}
            item={item.number}
            class={item.class}
            date={item.date}
            onItemClick={this.props.onItemClick}
          />
        ))}
      </div>
    );
  }
}
