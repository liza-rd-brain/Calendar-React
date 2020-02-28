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

import Layout from "./layouts/Layout";

import NewTask from "./pages/NewTask/NewTask";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      /* selectDay: new Date().getDate(), */
      selectDay: new Date(),
      startYear: 2010,
      newTaskName: "",
      newTaskDesc: "",
      newTaskStartTime: "",
      newTaskStartDate: "",
      newTaskEndTime: "",
      newTaskEndDate: "",
      taskList: [
        {
          name: "12:00",
          startDate: "2020-02-28",
          startTime: "12:00",
          endDate: "2020-02-28"
        },
        {
          name: "14:00",
          startDate: "2020-02-28",
          startTime: "14:00",
          endDate: "2020-02-28"
        },
        {
          name: "09:00",
          startDate: "2020-02-28",
          startTime: "09:00",
          endDate: "2020-02-28"
        }
      ],
      currtaskList: [],
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
    this.handleToCalendar = this.handleToCalendar.bind(this);
    this.handleToMonthSelection = this.handleToMonthSelection.bind(this);
    this.handleToYearSelection = this.handleToYearSelection.bind(this);
    this.handleCreateNewTask = this.handleCreateNewTask.bind(this);
    this.handleChangeTaskList = this.handleChangeTaskList.bind(this);
    this.selectCurrentTask = this.selectCurrentTask.bind(this);
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
    this.setState(state => {
      return { startYear: state.startYear + 16 };
    });
  }

  handleDecStartYear() {
    this.setState(state => {
      return { startYear: state.startYear - 16 };
    });
  }

  hahdleChangeSelectDay(selectDay) {
    this.setState(
      {
        selectDay
      },
      () => this.selectCurrentTask(),
      console.log(this.state)
    );
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
          newTaskStartTime: event.target.value
        });
        break;
      case "endDate":
        this.setState({
          newTaskEndDate: event.target.value
        });
        break;
      case "endTime":
        this.setState({
          newTaskEndTime: event.target.value
        });
        break;
      default:
        console.log("Error!");
    }
  }

  handleChangeTaskList(event) {
    event.preventDefault();

    let newTask = {
      name: this.state.newTaskName,
      desc: this.state.newTaskDesc,
      startDate: this.state.newTaskStartDate,
      startTime: this.state.newTaskStartTime,
      endDate: this.state.newTaskEndDate,
      endTime: this.state.newTaskEndTime
    };

    this.setState(
      state => {
        return { taskList: this.state.taskList.concat(newTask) };
      },
      () => this.selectCurrentTask(),
      console.log(this.state)
    );

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
    this.selectCurrentTask();
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

  /*выдача сегодняшней задачи*/
  selectCurrentTask() {
    debugger;
    let selectDate = moment(this.state.selectDay).format("YYYY-MM-DD");
    let result = this.state.taskList.filter(
      //находим item для которого выбранная дата лежит между начальной и конечной датой задачи
      item =>
        moment(selectDate).isBetween(item.startDate, item.endDate, null, "[]")
    );

    result.sort((firstItem, secondItem) => {
      /* s */
      if (
        +firstItem.startTime.slice(0, 2) < +secondItem.startTime.slice(0, 2)
      ) {
        return -1;
      }
      if (
        +firstItem.startTime.slice(0, 2) > +secondItem.startTime.slice(0, 2)
      ) {
        return +1;
      }
    });
    this.setState({
      currtaskList: result
    });
    console.log(result);
    console.log(moment(this.state.selectDay).format("YYYY-MM-DD"));
  }

  render() {
    return (
      <>
        <Switch>
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
          <Route path="/">
            <Layout
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              selectDay={this.state.selectDay}
              hrefNewTask={this.hrefNewTask}
              taskList={this.state.currtaskList}
            >
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
                  taskList={this.state.currtaskList}
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
            </Layout>
          </Route>
        </Switch>
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
