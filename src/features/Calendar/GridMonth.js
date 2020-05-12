import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import * as commonStyle from "./../../theme";
import moment from "moment";

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
  const [date, today] = useSelector((state) => [state.date, state, today]);
  const currDate = date || today;

  const todayYear = moment(currDate).format("YYYY");
  const todayMonth = moment(currDate).format("MMMM");
  const currYear = moment(today).format("YYYY");

  const monthList = new Array(12).fill(0).map((item, index) => {
    return moment().locale("ru").month(index).format("MMM");
  });

  const months = monthList.map((name, i) => {
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
