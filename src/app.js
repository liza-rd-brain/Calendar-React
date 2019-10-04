import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import MonthSelection from "./components/MonthSelection";
import YearSelection from "./components/YearSelection";

import "./style.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    this.startYear = 2010;
    this.handleChangeDate = this.handleChangeDate.bind(this);

    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
  }

  handleChangeDate(month, year) {
    /* debugger; */
    this.setState({
      month: month /*|| this.state.month, */,
      year: year /*|| this.state.year */
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
    /*     debugger; */
    return (
      <Router>
        <Route exact path="/" component={Calendar}>
          <Calendar
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            onchangeDate={this.handleChangeDate}
            href="/monthSelection"
          />
        </Route>
        <Route exact path="/monthSelection" component={MonthSelection}>
          <MonthSelection
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            onchangeDate={this.handleChangeDate}
            href="/yearSelection"
          />
        </Route>
        <Route exact path="/yearSelection" component={YearSelection}>
          <YearSelection
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            startYear={this.startYear}
          ></YearSelection>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
