import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList/TaskList";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectDay: new Date().getDate(),
      startYear: 2010
    };

    this.endYear = this.state.startYear + 15;
    console.log(this.endYear);

    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeStartYear = this.handleChangeStartYear.bind(this);
    this.handleIncStartYear = this.handleIncStartYear.bind(this);
    this.handleDecStartYear = this.handleDecStartYear.bind(this);
    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.hahdleChangeSelectDay = this.hahdleChangeSelectDay.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
  }

  handleChangeMonth(month) {
    this.setState({
      month
      /*    month: month */
    });
  }

  handleChangeYear(year) {
    this.setState({
      year
      /* year: year */
    });
  }

  handleChangeStartYear(year) {
    debugger;
    if (year < this.state.startYear) {
      this.handleDecStartYear();
    } else if (year > this.endYear) {
      this.handleIncStartYear();
    }
  }

  handleIncStartYear() {
    this.setState({
      startYear: this.state.startYear + 16
    });
  }

  handleDecStartYear() {
    this.setState({
      startYear: this.state.startYear - 16
    });
  }

  hahdleChangeSelectDay(selectDay) {
    this.setState({
      selectDay
      /*   selectDay: selectDay */
    });
  }

  updateSystemDate() {
    const numberDayTomorrow = new Date().getDate();
    const numberDayToday = this.state.today.getDate();
    if (numberDayTomorrow !== numberDayToday) {
      this.setState({ today: new Date() });
    }
  }

  render() {
    return (
      <>
        <Calendar
          today={this.state.today}
          month={this.state.month}
          year={this.state.year}
          onChangeSelectDay={this.hahdleChangeSelectDay}
          onChangeMonth={this.handleChangeMonth}
          onChangeYear={this.handleChangeYear}
          onChangeDate={this.handleChangeDate}
          onChangeStartYear={this.handleChangeStartYear}
          onIncStartYear={this.handleIncStartYear}
          onDecStartYear={this.handleDecStartYear}
          startYear={this.state.startYear}
          endYear={this.endYear}
        />
        <TaskList
          today={this.state.today}
          month={this.state.month}
          year={this.state.year}
          selectDay={this.state.selectDay}
        />
      </>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
