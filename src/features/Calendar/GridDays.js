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
  width: 42px;
  margin: 0 5px;
  position: relative;
  z-index: 2;
  cursor: pointer;
  /* color: lightgrey; */
  color: ${(props) => {
    /*  debugger; */
    switch (props.type) {
      case "dayAnotherMonth":
        return props.theme.commonStyle.gray;
      case "dayCurrentMonth":
        return props.theme.commonStyle.white;
      default:
        return props.theme.commonStyle.white;
    }
  }};
  background-color: ${(props) => {
    /*  debugger; */
    switch (props.type) {
      case "today":
        return props.theme.commonStyle.brightblue;
    }
  }};

  /*  props.inputColor || "palevioletred" */

  &:before {
    content: "";
    border: 20px solid;
    border-color: ${(props) =>
      props.type === "today"
        ? props.theme.commonStyle.background
        : "transparent"};
    position: absolute;
    top: 0px;
    /* transform: rotate(45deg); */
    z-index: -1;
    top: 1px;
    left: 3px;
  }
  &:after {
    content: "";
    border: 18px solid;
    border-color: ${(props) =>
      props.type === "today"
        ? props.theme.commonStyle.brightblue
        : "transparent"};
    position: absolute;
    top: 0px;
    /* transform: rotate(45deg); */
    z-index: -1;
    top: 3px;
    left: 4px;
    right: 4px;
  }
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
    let className = "dayCurrentMonth";
    currDayNumber === dayNumber && month === currMonth && year === currYear
      ? (className = "today")
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
      class: "dayAnotherMonth",
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
      class: "dayAnotherMonth",
    });
    dayNumberNextMonth++;
    variableDateNext = new Date(year, month + 1, (dayNext += 1));
  }

  return listPrevCurrentMonth.concat(listNextMonth);
}

function GridDays(props) {
  const listAllMonth = getListAllMonth(props);
  return (
    <ThemeProvider theme={commonStyle}>
      <Grid>
        {listAllMonth.map((item) => (
          <Day
            key={item.number + item.class}
            type={item.class}
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
        ))}
      </Grid>
    </ThemeProvider>
  );
}
export default GridDays;
