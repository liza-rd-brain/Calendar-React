import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import * as commonStyle from "./../../theme";
import moment from "moment";

const Year = styled.div`
  width: 90px;
  color: ${(props) => props.theme.commonStyle.white};
  background-color: ${(props) => {
    switch (props.type) {
      case "currYear":
        return props.theme.commonStyle.brightblue;
    }
  }};
  &:hover {
    outline: 2px solid;
    outline-color: ${(props) => props.theme.commonStyle.lightgray};
  }
  text-align: center;
  padding: 30px 0;
`;

function GridYears(props) {
  const [today, date] = useSelector((state) => [state.today, state.selectDay]);
  const dispatch = useDispatch();
  const startYear = props.startYear;
  const todayYear = moment(today).year();

  let yersList = [];
  const lenghtYersList = 16;
  let yearStart = startYear;

  for (let counter = 0; counter < lenghtYersList; counter++) {
    let className = "numberYear";
    todayYear === yearStart ? (className = "currYear") : "";
    yersList.push({ number: yearStart, class: className });
    yearStart++;
  }

  const years = yersList.map((item, i) => {
    return (
      <Year
        key={`${item.number}-${i}}`}
        type={item.class}
        onClick={() => {
          dispatch({
            type: "changeSelectDay",
            payload: new Date(item.number, moment(date).format("MM")),
          }),
            dispatch({
              type: "setMode",
              payload: "month",
            });
        }}
        /*     onClick={() => props.onItemClick(item.number)} */
      >
        {item.number}
      </Year>
    );
  });

  return <>{years}</>;
}

export default GridYears;
