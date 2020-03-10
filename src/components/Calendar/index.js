import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

import moment from "moment";
moment.locale("ru");

import Nav from "../Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";
import MonthSelection from "./MonthSelection/index";
import YearSelection from "./YearSelection/index";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    /* this.state = {
      title: ""
    }; */
    /*    this.handleItemClick = this.handleItemClick.bind(this); */
    this.сreateNavTitle = this.сreateNavTitle.bind(this);
  }
  /*  handleItemClick() {} */

  handleArrowClick(direction) {
    if (direction === "right") {
      let date = new Date(this.props.year, this.props.month + 1);
      this.props.onChangeMonth(date.getMonth());
      this.props.onChangeYear(date.getFullYear());
      this.props.onChangeStartYear(date.getFullYear());
    } else {
      let date = new Date(this.props.year, this.props.month - 1);
      this.props.onChangeMonth(date.getMonth());
      this.props.onChangeYear(date.getFullYear());
      this.props.onChangeStartYear(date.getFullYear());
    }
  }

  сreateNavTitle(name) {
    /*   const date = new Date(this.props.year, this.props.month); */
    const monthName = moment(this.props.today).format("MMMM");
    const currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    const yearsString = `${this.props.startYear}-${this.props.endYear}`;

    switch (name) {
      case "day":
        return `${currentMonthName} ${this.props.year}`;
      case "month":
        return this.props.year;
      case "year":
        return yearsString;

      default:
        break;
    }
  }

  componentDidMount() {
    this.сreateNavTitle();
    /* debugger; */
  }

  render() {
    return (
      <div className="calendar">
        <Route exact path="/">
          <Nav
            /* 
          className="nav"
          today={this.props.today}
          month={this.props.month}
          year={this.props.year} */
            onArrowClick={this.handleArrowClick}
            onTitleClick={this.props.onRouteToMonth}
            title={this.сreateNavTitle("day")}
          />
          <NameDays />
          <GridDays
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onItemClick={this.props.onChangeSelectDay}
          />
        </Route>
        <Route path="/monthSelection">
          <Nav
            onArrowClick={this.handleArrowClick}
            onTitleClick={this.props.onRouteToMonth}
            title={this.сreateNavTitle("month")}
          />
          <MonthSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onItemClick={this.props.onChangeSelectDay}
          />
        </Route>
        <Route path="/yearSelection">
          <Nav
            onArrowClick={this.handleArrowClick}
            onTitleClick={this.props.onRouteToMonth}
            title={this.сreateNavTitle("year")}
          />
          <YearSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            startYear={this.props.startYear}
            onItemClick={this.props.onChangeSelectDay}
          />
        </Route>
      </div>
    );
  }
}

export default withRouter(Calendar);
