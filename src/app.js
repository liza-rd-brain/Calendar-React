import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

import moment from "moment";

import Calendar from "./features/Calendar";
import TaskCard from "./pages/TaskCard";
import Timer from "./features/Timer";
import TaskList from "./features/TaskList/TaskList";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //день от которого начинаем рисовать календарь
      today: new Date(),

      selectDay: new Date(),

      taskList: [
        /* 
        {
          id: 1,
          name: "12:00",
          startDate: "2020-02-28",
          startTime: "12:00",
          endDate: moment(new Date()).format("YYYY-MM-DD"),
          endTime: "",
          desc: "12:00"
        },
        {
          id: 2,
          name: "14:00",
          startDate: "2020-02-28",
          startTime: "14:00",
          endDate: moment(new Date()).format("YYYY-MM-DD"),
          endTime: ""
        },
        {
          id: 3,
          name: "09:00",
          startDate: "2020-02-28",
          startTime: "09:00",
          endDate: moment(new Date()).format("YYYY-MM-DD"),
          endTime: ""
        } */
      ],
      currtaskList: [],
      currTask: { name: 1 },
      time: moment().format("LTS")
    };

    /* this.endYear = this.state.startYear + 15; */

    this.hrefNewTask = "newTask";

    this.startInputTitle = "Дата начала";
    this.endInputTitle = "Дата окончания";

    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.updateSystemTime = this.updateSystemTime.bind(this);
    this.hahdleChangeSelectDay = this.hahdleChangeSelectDay.bind(this);
    /*скорее заменить на переход на главную страницу,
    а страница уже сама манажит свой роутер*/

    this.handleToCalendar = this.handleToCalendar.bind(this);

    this.handleChangeTaskList = this.handleChangeTaskList.bind(this);
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    this.selectCurrentTask = this.selectCurrentTask.bind(this);
    this.onTaskClick = this.onTaskClick.bind(this);
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

  handleAddNewTask(newTask) {
    /* находим максимальное id и увеличиваем на 1 */
    if (this.state.taskList.length) {
      let id =
        Math.max.apply(
          null,
          this.state.taskList.map(item => item.id)
        ) + 1;

      newTask.id = id;
    } else {
      newTask.id = 1;
    }

    this.setState(
      state => {
        return { taskList: this.state.taskList.concat(newTask) };
      },
      () => {
        this.selectCurrentTask(), console.log(this.state.taskList);
        this.handleToCalendar();
      }
    );
  }

  handleChangeTaskList(newTask) {
    /* находим по id элемент и перезаписываем */

    let changeTaskindex = this.state.taskList.findIndex(
      item => item.id == newTask.id
    );

    this.setState(
      state => {
        return {
          taskList: state.taskList.map((item, i) => {
            if (i === changeTaskindex) {
              return newTask;
            } else {
              return item;
            }
          })
        };
      },

      () => {
        this.selectCurrentTask();
        console.log(this.state.taskList);
        this.handleToCalendar();
      }
    );
  }

  handleDeleteTask(task) {
    /*пришла таска
    ищем ее id и удаляем!*/
    this.setState(
      state => {
        return {
          taskList: state.taskList.filter((item, i) => {
            return item.id !== task.id;
          })
        };
      },

      () => {
        this.selectCurrentTask();
        console.log(this.state.taskList);
        this.handleToCalendar();
      }
    );
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
    let selectDate = moment(this.state.selectDay).format("YYYY-MM-DD");
    let result = this.state.taskList.filter(
      //находим item для которого выбранная дата лежит
      //между начальной и конечной датой задачи
      item =>
        moment(selectDate).isBetween(item.startDate, item.endDate, null, "[]")
    );

    result.sort((firstItem, secondItem) => {
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

  onTaskClick(value) {
    this.setState(
      state => {
        return { currTask: value };
      },
      () => this.props.history.push(`/tasks/${value.name}`)
    );
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/newTask">
            <TaskCard
              startInputTitle={this.startInputTitle}
              endInputTitle={this.endInputTitle}
              onChangeTaskList={this.handleAddNewTask}
              handleDeleteTask={this.handleDeleteTask}
            />
          </Route>

          <Route path="/tasks/:name">
            {/*   прокинуть задачу! */}
            <TaskCard
              startInputTitle={this.startInputTitle}
              endInputTitle={this.endInputTitle}
              сurrTask={this.state.currTask}
              onChangeTaskList={this.handleChangeTaskList}
              handleToCalendar={this.handleToCalendar}
              handleDeleteTask={this.handleDeleteTask}
            />
          </Route>

          <Route path="/">
            <Timer today={this.props.today} time={this.state.time} />
            {this.props.children}
            <Calendar
              today={this.state.today}
              onChangeSelectDay={this.hahdleChangeSelectDay}
              onChangeYear={this.handleChangeYear}
              onChangeStartYear={this.handleChangeStartYear}
              onIncStartYear={this.handleIncStartYear}
              onDecStartYear={this.handleDecStartYear}
              startYear={this.state.startYear}
              yearInc={this.yearInc}
              startYear={this.state.startYear}
              onRouteToCalendar={this.handleToCalendar}
              onRouteToMonth={this.handleToMonthSelection}
              onRouteToYearh={this.handleToYearSelection}
              selectDay={this.state.selectDay}
              hrefNewTask={this.hrefNewTask}
            ></Calendar>

            <TaskList
              today={this.state.today}
              selectDay={this.state.selectDay}
              hrefNewTask={this.hrefNewTask}
              taskList={this.state.currtaskList}
              onTaskClick={this.onTaskClick}
            />
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
