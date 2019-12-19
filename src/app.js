import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import Main from "./pages/Main";
import Calendar from "./components/Calendar";
import MonthSelection from "./components/MonthSelection";
import YearSelection from "./components/YearSelection";
import TaskList from "./components/TaskList/TaskList";
import NewTask from "./components/TaskList/NewTask/NewTask";
import "./style.css";

/* const routes = [
  {
    path: "/",
    component: Main,
    routes: [
      {
        path: "/monthSelection",
        component: MonthSelection
      },
      {
        path: "/yearSelection",
        component: YearSelection
      }
    ]
  }
]; */

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
    this.handleToNewTask = this.handleToNewTask.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
    this.handleToCalendar = this.handleToCalendar.bind(this);
    this.handleToMonthSelection = this.handleToMonthSelection.bind(this);
    this.handleToYearSelection = this.handleToYearSelection.bind(this);
  }

  handleChangeMonth(month) {
    this.setState({
      month
    });
  }

  handleChangeYear(year) {
    this.setState({
      year
    });
  }

  handleChangeStartYear(year) {
    /* debugger; */
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
    });
  }
  handleToNewTask() {
    /*  console.log("click"); */
    this.props.history.push("newTask");
  }
  handleToCalendar() {
    this.props.history.push("/");
  }

  handleToMonthSelection() {
    debugger;
    this.props.history.push("/monthSelection");
  }

  handleToYearSelection() {
    this.props.history.push("/yearSelection");
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
        <Route path="/">
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
            onRouteToCalendar={this.handleToCalendar}
            onRouteToMonth={this.handleToMonthSelection}
            onRouteToYearh={this.handleToYearSelection}
          />
          <Route exact path="/">
            <TaskList
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              selectDay={this.state.selectDay}
              onClickNewTask={this.handleToNewTask}
            />
          </Route>
        </Route>
        <Route exact path="/newTask" component={NewTask}></Route>
      </>
    );
  }
}

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.querySelector("#root")
);
