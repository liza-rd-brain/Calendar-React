import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

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

  const onChangeDate = date => {
    setDate(date);
  };

  const onChangeStartYear = date => {
    let year = date.getFullYear();
    if (year < startYear) {
      /* startYear = startYear - yearInc - 1; */
      setStartYear(startYear => startYear - yearInc - 1);
      /*
       * todo: почему else if?
       */
    } else if (year > startYear + yearInc) {
      /*  startYear = startYear + yearInc + 1; */
      setStartYear(startYear => startYear + yearInc + 1);
    }
    setDate(date);
  };

  const changeRouteToCalender = month => {
    /*проще принять месяц*/

    let currDay = date || props.today;
    let date = new Date(currDay.getFullYear(), month);
    onChangeDate(date);
    setMode("day");
  };

  const changeRouteToMonth = year => {
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

  const createNavTitle = name => {
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
        <div className="calendar">
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
        </div>
      );

    case "month":
      return (
        <div className="calendar">
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
        </div>
      );

    case "year":
      return (
        <div className="calendar">
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
        </div>
      );

    default:
      return null;
  }
}

function NameDays() {
  return (
    <div className="nameDaysList">
      {NAME_DAYS.map(name => {
        return (
          <div key={name} className="nameDay">
            {name}
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Calendar);
