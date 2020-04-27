import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";
moment.locale("ru");
moment().format("ll");

import Nav from "./Nav";
import GridDays from "./GridDays";
import GridMonth from "./GridMonth";
import YearSelection from "./GridYears";

const NAME_DAYS = ["пн", "вт", "ср", "чт", "пт", "сбб", "вск"];
const yearInc = 15;
/* let startYear = 2010; */

const CalendarWrap = styled.div`
  width: 100%;
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
    let currDate;
    switch (name) {
      case "day":
        currDate =
          direction === "right"
            ? new Date(currDay.getFullYear(), currDay.getMonth() + 1)
            : new Date(currDay.getFullYear(), currDay.getMonth() - 1);
        onChangeDate(currDate);
        break;
      case "month":
        currDate =
          direction === "right"
            ? new Date(currDay.getFullYear() + 1, currDay.getMonth())
            : new Date(currDay.getFullYear() - 1, currDay.getMonth());
        onChangeDate(currDate);
        break;
      case "year":
        currDate =
          direction === "right"
            ? new Date(currDay.getFullYear() + yearInc, currDay.getMonth())
            : new Date(currDay.getFullYear() - yearInc, currDay.getMonth());
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
    let year = date.getFullYear();
    if (year < startYear) {
      /* startYear = startYear - yearInc - 1; */
      setStartYear((startYear) => startYear - yearInc - 1);
      /*
       * todo: почему else if?
       */
    } else if (year > startYear + yearInc) {
      /*  startYear = startYear + yearInc + 1; */
      setStartYear((startYear) => startYear + yearInc + 1);
    }
    setDate(date);
  };

  const changeRouteToCalender = (month) => {
    /*проще принять месяц*/

    let currDay = date || props.today;
    let date = new Date(currDay.getFullYear(), month);
    onChangeDate(date);
    setMode("day");
  };

  const changeRouteToMonth = (year) => {
    if (year) {
      let currDay = date || props.today;
      let date = new Date(year, currDay.getMonth());
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
    const currYear = currDate.getFullYear();
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

  switch (mode) {
    case "day":
      return (
        <CalendarWrap>
          <Nav
            onArrowClick={handleArrowClick}
            onTitleClick={() => changeRouteToMonth()}
            title={createNavTitle("day")}
            name={"day"}
          />
          <NameDays />
          <GridDays
            today={props.today}
            date={date}
            onItemClick={props.onChangeSelectDay}
          />
        </CalendarWrap>
      );

    case "month":
      return (
        <CalendarWrap>
          <Nav
            onArrowClick={handleArrowClick}
            onTitleClick={changeRouteToYear}
            title={createNavTitle("month")}
            name={"month"}
          />
          <GridMonth
            today={props.today}
            date={date}
            onItemClick={changeRouteToCalender}
          />
        </CalendarWrap>
      );

    case "year":
      return (
        <CalendarWrap>
          <Nav
            onArrowClick={handleArrowClick}
            title={createNavTitle("year")}
            name={"year"}
          />
          <YearSelection
            today={props.today}
            date={date}
            startYear={startYear}
            onItemClick={changeRouteToMonth}
          />
        </CalendarWrap>
      );

    default:
      return null;
  }
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
