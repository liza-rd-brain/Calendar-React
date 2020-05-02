import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

import moment from "moment";
moment.locale("ru");

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
  const firstDayCurrMonht =
    props.date || moment(props.today).format("YYYY-MM-01");
  const currMonth = moment(firstDayCurrMonht).month();

  const firstDayGrid =
    moment(firstDayCurrMonht).format("e") == startWeekDay
      ? firstDayCurrMonht
      : moment(firstDayCurrMonth).day(startWeekDay).format("YYYY-MM-DD");

  const listAllMonth = new Array(amountDays)
    .fill(currMonth)
    .map((item, index) => {
      const monthItem = moment(firstDayGrid).month();
      const dateItem = moment(firstDayGrid);
      let className = monthItem == item ? "dayCurrentMonth" : "dayAnotherMonth";
      moment(firstDayCurrMonth).format("YYYY-MM-DD") ==
      dateItem.format("YYYY-MM-DD")
        ? (className = "today")
        : "";
      return {
        number: index,
        date: dateItem.add(index, "d").format("YYYY-MM-DD"),
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
    </ThemeProvider>
  );
}
export default GridDays;
