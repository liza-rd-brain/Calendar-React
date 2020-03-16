import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import moment from "moment";

import Nav from "./Nav";
import GridDays from "./GridDays";
import MonthSelection from "./MonthSelection";
import YearSelection from "./YearSelection";

const NAME_DAYS = ["пн", "вт", "ср", "чт", "пт", "сбб", "вск"];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: /* new Date(1990, 5, 5) */ "",
      startYear: 2010
    };
    this.yearInc = 15;
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.createNavTitle = this.createNavTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.changeRouteToCalender = this.changeRouteToCalender.bind(this);
    this.changeRouteToMonth = this.changeRouteToMonth.bind(this);
    this.changeRouteToYear = this.changeRouteToYear.bind(this);
    this.onChangeStartYear = this.onChangeStartYear.bind(this);
  }

  handleArrowClick(direction, name) {
    /*сегодня или другие месяцы*/
    let currDay = this.state.date || this.props.today;
    let date;
    switch (name) {
      case "day":
        date =
          direction === "right"
            ? new Date(currDay.getFullYear(), currDay.getMonth() + 1)
            : new Date(currDay.getFullYear(), currDay.getMonth() - 1);
        this.onChangeDate(date);
        break;
      case "month":
        date =
          direction === "right"
            ? new Date(currDay.getFullYear() + 1, currDay.getMonth())
            : new Date(currDay.getFullYear() - 1, currDay.getMonth());
        this.onChangeDate(date);
        break;
      case "year":
        date =
          direction === "right"
            ? new Date(currDay.getFullYear() + this.yearInc, currDay.getMonth())
            : new Date(
                currDay.getFullYear() - this.yearInc,
                currDay.getMonth()
              );
        this.onChangeStartYear(date);
        break;

      default:
        break;
    }
  }

  onChangeDate(date) {
    this.setState(
      state => {
        return { date };
      },
      () => console.log(this.state.date)
    );
  }
  onChangeStartYear(date) {
    let year = date.getFullYear();
    if (year < this.state.startYear) {
      this.setState(state => {
        return { startYear: state.startYear - this.yearInc - 1, date };
      });
    } else if (year > this.state.startYear + this.yearInc) {
      this.setState(state => {
        return { startYear: state.startYear + this.yearInc + 1, date };
      });
    }
  }

  changeRouteToCalender(month) {
    /*проще принять месяц*/

    let currDay = this.state.date || this.props.today;
    let date = new Date(currDay.getFullYear(), month);
    this.onChangeDate(date);
    this.props.history.push("/");
  }

  changeRouteToMonth(year) {
    if (year) {
      let currDay = this.state.date || this.props.today;
      let date = new Date(year, currDay.getMonth());
      this.onChangeDate(date);
    }

    this.props.history.push("/monthSelection");
  }
  changeRouteToYear() {
    this.props.history.push("/yearSelection");
  }

  createNavTitle(name) {
    const date = this.state.date || this.props.today;
    const monthName = moment(date).format("MMMM");
    const currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    const currYear = date.getFullYear();
    const yearsString = `${this.state.startYear}-${this.state.startYear +
      this.yearInc}`;

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
  }

  componentDidMount() {
    this.createNavTitle();
  }

  render() {
    return (
      <div className="calendar">
        <Switch>
          <Route exact path="/">
            <Nav
              onArrowClick={this.handleArrowClick}
              onTitleClick={() => this.changeRouteToMonth()}
              title={this.createNavTitle("day")}
              name={"day"}
            />
            <NameDays/>
            <GridDays
              today={this.props.today}
              date={this.state.date}
              onItemClick={this.props.onChangeSelectDay}
            />
          </Route>
          <Route path="/monthSelection">
            <Nav
              onArrowClick={this.handleArrowClick}
              onTitleClick={this.changeRouteToYear}
              title={this.createNavTitle("month")}
              name={"month"}
            />
            <MonthSelection
              today={this.props.today}
              date={this.state.date}
              onItemClick={this.changeRouteToCalender}
            />
          </Route>
          <Route path="/yearSelection">
            <Nav
              onArrowClick={this.handleArrowClick}
              title={this.createNavTitle("year")}
              name={"year"}
            />
            <YearSelection
              today={this.props.today}
              date={this.state.date}
              startYear={this.state.startYear}
              onItemClick={this.changeRouteToMonth}
            />
          </Route>
        </Switch>
      </div>
    );
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
