/*
import Timer from "./components/Timer";
import Calendar from "./components/Calendar";
import MonthSelection from "./components/MonthSelection";
import YearSelection from "./components/YearSelection";
import TaskList from "./components/TaskList/TaskList";
import NewTask from "./components/TaskList/NewTask/NewTask";
import "./style.css";*/

import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import moment from "moment";

import Main from "./pages/Main/Main";
import MonthSelectionPage from "./pages/MonthSelectionPage/MonthSelectionPage";
import YearSelectionPage from "./pages/YearSelectionPage/YearSelectionPage";

import NewTask from "./pages/NewTask/NewTask";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectDay: new Date().getDate(),
      startYear: 2010,
      newTaskName: "",
      newTaskDesc: "",
      newTaskStartTime: "",
      newTaskStartDate: "",
      newTaskEndTime: "",
      newTaskEndDate: "",
      taskList: [],
      time: moment().format("LTS")
    };

    this.endYear = this.state.startYear + 15;
    this.hrefNewTask = "newTask";
    /*  console.log(this.endYear); */

    this.nameValue = "name";
    this.descValue = "desc";
    this.startDateValue = "startDate";
    this.startTimeValue = "startTime";
    this.endDateValue = "endDate";
    this.endTimeValue = "endTime";
    this.startInputTitle = "Дата начала";
    this.endInputTitle = "Дата окончания";

    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeStartYear = this.handleChangeStartYear.bind(this);
    this.handleIncStartYear = this.handleIncStartYear.bind(this);
    this.handleDecStartYear = this.handleDecStartYear.bind(this);
    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.updateSystemTime = this.updateSystemTime.bind(this);
    this.hahdleChangeSelectDay = this.hahdleChangeSelectDay.bind(this);
    this.handleToNewTask = this.handleToNewTask.bind(this);
    /*   this.update = setInterval(this.updateSystemDate, 1000);
    this.updateTime = setInterval(this.updateSystemTime, 100); */
    this.handleToCalendar = this.handleToCalendar.bind(this);
    this.handleToMonthSelection = this.handleToMonthSelection.bind(this);
    this.handleToYearSelection = this.handleToYearSelection.bind(this);
    this.handleCreateNewTask = this.handleCreateNewTask.bind(this);
    this.handleChangeTaskList = this.handleChangeTaskList.bind(this);
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
    if (year < this.state.startYear) {
      this.handleDecStartYear();
    } else if (year > this.endYear) {
      this.handleIncStartYear();
    }
  }

  handleIncStartYear() {
    this.state(state => {
      {
        return { startYear: state.startYear + 16 };
      }
    });
  }

  handleDecStartYear() {
    this.state(state => {
      {
        return { startYear: state.startYear - 16 };
      }
    });
  }

  hahdleChangeSelectDay(selectDay) {
    this.setState({
      selectDay
    });
  }

  handleToNewTask() {
    /*не нужно менять адрес в текущем окне */
    /*  this.props.history.push("newTask"); */
    this.props.history;
  }
  handleToCalendar() {
    this.props.history.push("/");
  }

  handleToMonthSelection() {
    this.props.history.push("/monthSelection");
  }

  handleToYearSelection() {
    this.props.history.push("/yearSelection");
  }

  handleCreateNewTask(event) {
    const name = event.target.name;
    debugger;
    switch (name) {
      case "name":
        this.setState({
          newTaskName: event.target.value
        });
        break;
      case "desc":
        this.setState({
          newTaskDesc: event.target.value
        });
        break;
      case "startDate":
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      case "startTime":
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      case "endDate":
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      case "endTime":
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      default:
        console.log("Error!");
    }
    /* if (name == "name") {
      console.log(name, event.target.value);
      this.setState({
        newTaskName: event.target.value
      });
    } else {
      console.log(name, event.target.value);
      this.setState({
        newTaskDesc: event.target.value
      });
    } */
  }

  handleChangeTaskList(event) {
    event.preventDefault();
    console.log("создалась задача");
    console.log(this.state);
    console.log(
      "name:" + this.state.newTaskName,
      "desc:" + this.state.newTaskDesc
    );

    let newTask = {
      name: this.state.newTaskName,
      desc: this.state.newTaskDesc
    };

    this.setState(state => {
      return { taskList: this.state.taskList.concat(newTask) };
    });

    //очищаю строки для ввода
    this.setState(state => {
      return {
        newTaskName: "",
        newTaskDesc: ""
      };
    });

    this.handleToCalendar();
  }

  componentDidMount() {
    this.updateID = setInterval(() => this.updateSystemDate(), 1000);
    this.updateTimeID = setInterval(() => this.updateSystemTime(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.updateID);
    clearInterval(this.updateTimeID);
  }

  updateSystemDate() {
    this.setState({ today: new Date() });
  }

  updateSystemTime() {
    this.setState({
      time: moment().format("LTS")
    });
  }

  render() {
    return (
      <>
        <Route exact path="/">
          <Main
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            onChangeSelectDay={this.hahdleChangeSelectDay}
            onChangeMonth={this.handleChangeMonth}
            onChangeYear={this.handleChangeYear}
            /*  onChangeDate={this.handleChangeDate} */
            onChangeStartYear={this.handleChangeStartYear}
            onIncStartYear={this.handleIncStartYear}
            onDecStartYear={this.handleDecStartYear}
            startYear={this.state.startYear}
            endYear={this.endYear}
            onRouteToCalendar={this.handleToCalendar}
            onRouteToMonth={this.handleToMonthSelection}
            onRouteToYearh={this.handleToYearSelection}
            selectDay={this.state.selectDay}
            hrefNewTask={this.hrefNewTask}
            taskList={this.state.taskList}
            time={this.state.time}
          />
        </Route>
        <Route path="/monthSelection">
          <MonthSelectionPage
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
            selectDay={this.state.selectDay}
            hrefNewTask={this.hrefNewTask}
            taskList={this.state.taskList}
            time={this.state.time}
          />
        </Route>
        <Route path="/yearSelection">
          <YearSelectionPage
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
            selectDay={this.state.selectDay}
            hrefNewTask={this.hrefNewTask}
            taskList={this.state.taskList}
            time={this.state.time}
          />
        </Route>

        <Route path="/newTask">
          <NewTask
            nameValue={this.nameValue}
            descValue={this.descValue}
            startInputTitle={this.startInputTitle}
            startDateValue={this.startDateValue}
            startTimeValue={this.startTimeValue}
            endInputTitle={this.endInputTitle}
            endDateValue={this.endDateValue}
            endTimeValue={this.endTimeValue}
            onCreateNewTask={this.handleCreateNewTask}
            onChangeTaskList={this.handleChangeTaskList}
          />
        </Route>
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

/* ReactDOM.render(
  <Router>
    <Main />
    <MonthSelection />
    <YearSelection />
    <NewTask />
  </Router>,
  document.querySelector("#root")
);
 */
