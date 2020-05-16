import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";
moment().format("ll");

import Nav from "./Nav";
import GridDays from "./GridDays";
import GridMonth from "./GridMonth";
import YearSelection from "./GridYears";

/* const NAME_DAYS = ["пн", "вт", "ср", "чт", "пт", "сбб", "вск"]; */
const NAME_DAYS = new Array(7).fill(0).map((item, index) => {
  return moment()
    .locale("ru")
    .day(index + 1)
    .format("ddd");
});

const yearInc = 16;

/*мутирую startYear
не нравится неявная мутаця!!!!*/
let startYear = 2010;

const CalendarWrap = styled.div`
  width: 100%;
  height: 400px;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 250px;
  padding: 10px;
  align-items: center;
`;

const NameDaysList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

const NameDayWap = styled.div`
  width: 15%;
  text-align: center;
  color: ${(props) => props.theme.commonStyle.lightgray};
`;

function Calendar() {
  const dispatch = useDispatch();
  const [today, date, mode] = useSelector((state) => [
    state.today,
    state.selectDay,
    state.mode,
  ]);

  useEffect(
    function updateStartYear() {
      changeStartYear();
    },
    [date]
  );

  const changeStartYear = () => {
    const currDate = date || today;
    const currYear = moment(currDate).year();

    if (currYear < startYear) {
      startYear = startYear - yearInc;
    } else if (currYear > startYear + yearInc) {
      startYear = startYear + yearInc;
    }
  };

  const handleArrowClick = (direction, name) => {
    let currDay = date || today;
    let momentCurrDay = moment(currDay);
    let currDate;

    switch (name) {
      case "day":
        currDate =
          direction === "right"
            ? momentCurrDay.add(1, "M").format()
            : momentCurrDay.subtract(1, "M").format();

        onChangeDate(currDate);
        break;
      case "month":
        currDate =
          direction === "right"
            ? momentCurrDay.add(1, "y").format()
            : momentCurrDay.subtract(1, "y").format();
        onChangeDate(currDate);

        break;
      case "year":
        startYear =
          direction === "right" ? startYear + yearInc : startYear - yearInc;
        currDate = moment(momentCurrDay).format(`${startYear}-MM-DD`);
        onChangeDate(currDate);
        break;
      default:
        break;
    }
  };

  const onChangeDate = (date) => {
    dispatch({
      type: "changeSelectDay",
      payload: date,
    });
  };

  let grid = () => {
    switch (mode) {
      case "day":
        return <GridDays />;
      case "month":
        return <GridMonth />;
      case "year":
        return <YearSelection startYear={startYear} />;
      default:
        break;
    }
  };

  return (
    <CalendarWrap>
      <Nav
        onArrowClick={handleArrowClick}
        startYear={startYear}
        yearInc={yearInc}
      />
      {mode === "day" ? <NameDays /> : ""}
      <Grid>{grid()}</Grid>
    </CalendarWrap>
  );
}

function NameDays() {
  return (
    <NameDaysList>
      {NAME_DAYS.map((name) => {
        return <NameDayWap key={name}>{name}</NameDayWap>;
      })}
    </NameDaysList>
  );
}

export default withRouter(Calendar);
