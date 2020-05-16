import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as commonStyle from "./../../theme";
import moment from "moment";

const Day = styled.div`
  flex-grow: 1;
  text-align: center;
  padding: 10px 0;
  width: 42px;
  margin: 0 5px;
  position: relative;
  z-index: 2;
  /* outline-color: ${(props) => props.theme.commonStyle.lightgray}; */
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
    switch (props.type) {
      case "today":
        return props.theme.commonStyle.brightblue;
    }
  }};

  &:before {
    content: "";
    border: 1.1rem solid;
    border-color: ${(props) =>
      props.type === "today"
        ? props.theme.commonStyle.background
        : "transparent"};
    position: absolute;

    z-index: -1;
    top: 0.1rem;
    left: 0.15rem;
    border-left-width: 1.4rem;
  }
  &:after {
    content: "";
    border: 0.9rem solid;
    border-color: ${(props) =>
      props.type === "today"
        ? props.theme.commonStyle.brightblue
        : "transparent"};
    position: absolute;

    z-index: -1;
    top: 0.29rem;
    left: 0.3rem;
    border-left-width: 1.3rem;
  }

  &:hover {
    outline: 2px solid;
    outline-color: ${(props) => props.theme.commonStyle.lightgray};
  }
 /*  outline: 2px solid; */
  outline:${(props) => {
    if (props.type === "focus") {
      return props.theme.commonStyle.brightblue + "2px solid";
    }
  }}
`;

function getListAllMonth(today, date, dayInFocus) {
  const amountDays = 42;
  const startWeekDay = 1;
  const currDate = moment(today).format("YYYY-MM-DD");
  const firstDateCurrMonth =
    moment(date).format("YYYY-MM-01") || moment(today).format("YYYY-MM-01");
  const currMonth = moment(firstDateCurrMonth).month();

  const firstDayGrid =
    moment(firstDateCurrMonth).format("e") == startWeekDay
      ? firstDateCurrMonth
      : moment(firstDateCurrMonth).day(startWeekDay).format("YYYY-MM-DD");

  return new Array(amountDays).fill(currMonth).map((item, index) => {
    const momentItem = moment(firstDayGrid).add(index, "d");
    const dateItem = momentItem.format("YYYY-MM-DD");
    const monthItem = momentItem.month();
    const numberItem = momentItem.format("D");
    const momentFocus = moment(dayInFocus).format("YYYY-MM-DD");

    let className = monthItem == item ? "dayCurrentMonth" : "dayAnotherMonth";
    currDate == dateItem ? (className = "today") : "";
    momentFocus == dateItem && className != "today"
      ? (className = "focus")
      : "";
    return {
      number: numberItem,
      date: dateItem,
      class: className,
    };
  });
}

function GridDays(props) {
  const [today, date, dayInFocus] = useSelector((state) => [
    state.today,
    state.selectDay,
    state.dayInFocus,
  ]);
  const dispatch = useDispatch();
  const listAllMonth = getListAllMonth(today, date, dayInFocus);
  return (
    <ThemeProvider theme={commonStyle}>
      {listAllMonth.map((item) => (
        <Day
          key={item.date}
          type={item.class}
          item={item.number}
          onClick={() => {
            dispatch({
              type: "changeFocusDay",
              payload: item.date,
            }),
              dispatch({
                type: "changeSelectDay",
                payload: item.date,
              });
          }}
        >
          {item.number}
        </Day>
      ))}
    </ThemeProvider>
  );
}
export default GridDays;
