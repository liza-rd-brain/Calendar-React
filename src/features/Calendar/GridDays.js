import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 250px;
  padding: 10px;
`;

const Day = styled.div`
  flex-grow: 1;

  text-align: center;

  padding: 10px 0;
  cursor: pointer;
  color: lightgrey;
  width: 53px;
`;

function getListAllMonth(props) {
  /*выясняем, рисуем текущий месяц или какой-то требуемый,
  т.е. листнули календарь*/

  let currDate = props.date || props.today;

  const day = currDate.getDate();
  const month = currDate.getMonth();
  const year = currDate.getFullYear();

  /*  const currYear = props.year;
  const currMonth = props.month; */

  /*текущий месяц*/
  const currDayNumber = props.today.getDate();
  const currYear = props.today.getFullYear();
  const currMonth = props.today.getMonth();

  const firstDayCurrMonth = new Date(year, month, 1);
  const lastDayCurrMonth = new Date(year, month + 1, 0).getDate();

  let listCurrMonth = [];
  let dayNumber = 1;

  let dayByOrder = 1;
  let variableDate = new Date(year, month, dayByOrder);

  while (dayNumber <= lastDayCurrMonth) {
    let className = "dayCurrentMonth day";
    currDayNumber === dayNumber && month === currMonth && year === currYear
      ? (className += " today")
      : "";
    listCurrMonth.push({
      number: dayNumber,
      date: variableDate,
      class: className,
    });
    dayNumber++;
    variableDate = new Date(year, month, (dayByOrder += 1));
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
  const lastDayPrevMonth = new Date(currYear, month, 0).getDate();
  const firstDayPrevMonth = lastDayPrevMonth - amountPrevMohthDays + 1;
  let dayNumberPrevMonth = firstDayPrevMonth;
  let listPrevMonth = [];

  let dayPrev = firstDayPrevMonth;
  let variableDatePrev = new Date(year, month - 1, dayPrev);
  /* debugger; */

  while (dayNumberPrevMonth <= lastDayPrevMonth) {
    listPrevMonth.push({
      number: dayNumberPrevMonth,
      date: variableDatePrev,
      class: "another day",
    });
    dayNumberPrevMonth++;
    variableDatePrev = new Date(year, month - 1, (dayPrev += 1));
  }

  const listPrevCurrentMonth = listPrevMonth.concat(listCurrMonth);
  const amountNextMohthDays = 42 - listPrevCurrentMonth.length;

  let listNextMonth = [];
  let dayNumberNextMonth = 1;

  let dayNext = dayNumberNextMonth;
  let variableDateNext = new Date(year, month + 1, dayNext);

  while (dayNumberNextMonth < amountNextMohthDays + 1) {
    listNextMonth.push({
      number: dayNumberNextMonth,
      date: variableDateNext,
      class: "another day",
    });
    dayNumberNextMonth++;
    variableDateNext = new Date(year, month + 1, (dayNext += 1));
  }

  return listPrevCurrentMonth.concat(listNextMonth);
}

export default class GridDays extends React.Component {
  render() {
    const listAllMonth = getListAllMonth(this.props);
    return (
      <ThemeProvider theme={commonStyle}>
        <Grid>
          {listAllMonth.map((item) => (
            <Day
              key={item.number + item.class}
              item={item.number}
              onClick={() =>
                this.props.onItemClick({
                  type: "changeSelectDay",
                  payload: item.date,
                })
              }
            >
              {item.number}
            </Day>
            /*    <div
              key={item.number + item.class}
              item={item.number}
              className={item.class}
              onClick={() =>
                this.props.onItemClick({
                  type: "changeSelectDay",
                  payload: item.date,
                })
              }
            >
              {item.number}
            </div> */
          ))}
        </Grid>
      </ThemeProvider>
    );
  }
}
