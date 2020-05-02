import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";
/*вынести Grid в Calendar*/

const Month = styled.div`
  width: 90px;
  color: ${(props) => props.theme.commonStyle.white};
  text-align: center;
  padding: 30px 0;
  background-color: ${(props) => {
    switch (props.type) {
      case "currMonth":
        return props.theme.commonStyle.brightblue;
    }
  }};
  &:hover {
    outline: 2px solid;
    outline-color: ${(props) => props.theme.commonStyle.lightgray};
  }
`;

function GridMonth(props) {
  const currDate = props.date || props.today;
  const todayYear = currDate.getFullYear();
  const todayMonth = currDate.getMonth();
  const currYear = props.today.getFullYear();

  const monthsList = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const months = monthsList.map((name, i) => {
    let nameMonth = "nameMonth";
    todayMonth === i && todayYear === currYear ? (nameMonth = "currMonth") : "";
    return (
      <Month
        key={name}
        id={name}
        type={nameMonth}
        onClick={() => props.onItemClick(i)}
      >
        {name}
      </Month>
    );
  });

  return <ThemeProvider theme={commonStyle}>{months}</ThemeProvider>;
}

export default GridMonth;
