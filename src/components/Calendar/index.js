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
    this.state = {
      title: ""
    };
    /*    this.handleItemClick = this.handleItemClick.bind(this); */
    this.changeNavTitle = this.changeNavTitle.bind(this);
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
  changeNavTitle() {
    const date = new Date(this.props.year, this.props.month);
    const monthName = moment(date).format("MMMM");
    let currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    let yearsString = `${this.props.startYear}-${this.props.endYear}`;

    debugger;
    this.setState(
      () => {
        let history = this.props.history.location.pathname;
        switch (history) {
          case "/":
            return { title: `${currentMonthName} ${this.props.year}` };
            break;
          case "/monthSelection":
            return { title: this.props.year };
            break;
          case "/yearSelection":
            return { title: yearsString };
            break;
        }
      },
      () => console.log(this.state.title)
    );
  }

  componentDidMount() {
    this.changeNavTitle();
    /* debugger; */
  }
  /*   componentDidUpdate() {
    let history = this.props.history.location.pathname;
    switch (history) {
      case "/":
        console.log("/");
        break;
      case "/monthSelection":
        console.log("monthSelection");
        break;
      case "/yearSelection":
        console.log("yearSelection");
        break;
    }
  } */

  render() {
    return (
      <div className="calendar">
        <Nav
          className="nav"
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
          onArrowClick={this.handleArrowClick}
          onTitleClick={this.props.onRouteToMonth}
          title={this.state.title}
        />
        <Route exact path="/">
          <NameDays />
          <GridDays
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onItemClick={this.props.onChangeSelectDay}
          />
        </Route>
        <Route path="/monthSelection">
          <MonthSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onItemClick={this.props.onChangeSelectDay}
          />
        </Route>
        <Route path="/yearSelection">
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
