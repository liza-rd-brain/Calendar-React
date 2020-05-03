import React from "react";
import styled, { ThemeProvider } from "styled-components";
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
    border: 19px solid;
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
    border: 16px solid;
    border-color: ${(props) =>
      props.type === "today"
        ? props.theme.commonStyle.brightblue
        : "transparent"};
    position: absolute;
    top: 0px;
    /* transform: rotate(45deg); */
    z-index: -1;
    top: 4px;
    left: 5px;
    right: 5px;
  }
  &:hover {
    outline: 2px solid;
    outline-color: ${(props) => props.theme.commonStyle.lightgray};
  }
`;

function getListAllMonth(props) {
  const amountDays = 42;
  const startWeekDay = 1;
  const currDate = moment(props.today).format("YYYY-MM-DD");
  const firstDateCurrMonth =
    props.date || moment(props.today).format("YYYY-MM-01");
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

    let className = monthItem == item ? "dayCurrentMonth" : "dayAnotherMonth";
    currDate == dateItem ? (className = "today") : "";
    return {
      number: numberItem,
      date: dateItem,
      class: className,
    };
  });
}

function GridDays(props) {
  const listAllMonth = getListAllMonth(props);
  return (
    <ThemeProvider theme={commonStyle}>
      {listAllMonth.map((item) => (
        <Day
          key={item.date}
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
    </ThemeProvider>
  );
}
export default GridDays;
