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
      year: new Date().getFullYear()
    };
    this.startYear = 2010;
    this.endYear = this.startYear + 15;
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
  }

  handleChangeDate(month, year, startYear) {
    this.setState({
      month: month,
      year: year
    });
    this.startYear = startYear || this.startYear;
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
          onChangeDate={this.handleChangeDate}
          startYear={this.startYear}
        />
        <TaskList />
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
