import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
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

const yearInc = 15;

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

function Calendar(props) {
  const [date, setDate] = useState("");
  const [startYear, setStartYear] = useState(2010);
  const [mode, setMode] = useState("day");

  const handleArrowClick = (direction, name) => {
    /*сегодня или другие месяцы*/
    let currDay = date || props.today;
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
        currDate =
          direction === "right"
            ? momentCurrDay.add(yearInc, "y").format()
            : momentCurrDay.subtract(yearInc, "y").format();
        onChangeStartYear(currDate);
        break;

      default:
        break;
    }
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onChangeStartYear = (date) => {
    let year = moment(date).format("YYYY");
    if (year < startYear) {
      setStartYear((startYear) => startYear - yearInc - 1);
    } else if (year > startYear + yearInc) {
      setStartYear((startYear) => startYear + yearInc + 1);
    }
    setDate(date);
  };

  const changeRouteToCalender = (month) => {
    /*проще принять месяц*/
    let currDay = date || props.today;
    let date = new Date(moment(date).format("YYYY"), month);
    onChangeDate(date);
    setMode("day");
  };

  const changeRouteToMonth = (year) => {
    if (year) {
      let currDay = date || props.today;
      let date = new Date(year, moment(date).format("MM"));
      onChangeDate(date);
    }
    setMode("month");
  };

  const changeRouteToYear = () => {
    setMode("year");
  };

  const createNavTitle = (name) => {
    const currDate = date || props.today;
    const monthName = moment(currDate).format("MMMM");
    const currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);

    const currYear = moment(currDate).format("YYYY");

    const yearsString = `${startYear}-${startYear + yearInc}`;

    switch (name) {
      case "day":
        return `${currentMonthName} ${currYear}`;
      case "month":
        return currYear;
      case "year":
        return yearsString;

      default:
        break;
    }
  };

  let grid;
  switch (mode) {
    case "day":
      grid = (
        <GridDays
          today={props.today}
          date={date}
          onItemClick={props.onChangeSelectDay}
        />
      );
      break;
    case "month":
      grid = (
        <GridMonth
          today={props.today}
          date={date}
          onItemClick={changeRouteToCalender}
        />
      );
      break;
    case "year":
      grid = (
        <YearSelection
          today={props.today}
          date={date}
          startYear={startYear}
          onItemClick={changeRouteToMonth}
        />
      );
      break;
    default:
      break;
  }

  return (
    <CalendarWrap>
      <Nav
        onArrowClick={handleArrowClick}
        onTitleClick={
          mode === "day" ? () => changeRouteToMonth() : changeRouteToYear
        }
        title={createNavTitle(mode)}
        name={mode}
      />
      {mode === "day" ? <NameDays /> : ""}
      <Grid>{grid}</Grid>
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
