import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";

import moment from "moment";

import CalendarPage from "./pages/Main";
import TaskCard from "./pages/TaskCard";
import UndoRedo from "./test/UndoRedo";

import "./style.css";

moment.locale("ru");

const initialState = {
  today: new Date(),
  selectDay: new Date(),
  taskList: [
    /* {
      id: 1,
      name: "12:00",
      startDate: "2020-02-28",
      startTime: "12:00",
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      endTime: "",
      desc: "12:00",
    },
    {
      id: 2,
      name: "14:00",
      startDate: "2020-02-28",
      startTime: "14:00",
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      endTime: "",
    },
    {
      id: 3,
      name: "09:00",
      startDate: "2020-02-28",
      startTime: "09:00",
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      endTime: "",
    }, */
  ],
  currTask: { name: 1 },
  time: moment().format("LTS"),
};

function App(props) {
  const reducer = (state, action) => {
    /*  debugger; */
    switch (action.type) {
      case "changeSelectDay":
        /*  selectCurrentTask(); */
        return {
          ...state,
          selectDay: action.payload,
        };

      case "addNewTask":
        /*  selectCurrentTask(); */
        return {
          ...state,
          taskList: [...state.taskList.concat(action.payload)],
        };
      case "setCurrTaskList":
        return {
          ...state,
          currtaskList: action.payload,
        };
      case "setCurrTask":
        return {
          ...state,
          currTask: action.payload,
        };
      case "changeTask":
        return {
          ...state,
          taskList: state.taskList.map((item, i) => {
            if (i === action.index) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case "deleteTask":
        debugger;
        return {
          ...state,
          taskList: state.taskList.filter((item, i) => {
            return item.id !== action.payload.id;
          }),
        };
      case "setDate":
        return {
          ...state,
          today: action.payload,
        };
      case "setTime":
        return {
          ...state,
          time: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const updateID = setInterval(
      () => dispatch({ type: "setDate", payload: new Date() }),
      1000
    );
    const updateTimeID = setInterval(
      () => dispatch({ type: "setTime", payload: moment().format("LTS") }),
      1000
    );

    return () => {
      clearInterval(updateTimeID);
      clearInterval(updateID);
    };
  }, [state.currtaskList]);

  const hrefNewTask = "newTask";
  const startInputTitle = "Дата начала";
  const endInputTitle = "Дата окончания";

  const handleToCalendar = () => {
    props.history.push("/");
  };

  const handleAddNewTask = (newTask) => {
    debugger;
    /* находим максимальное id и увеличиваем на 1 */
    if (state.taskList.length) {
      let idMax =
        Math.max.apply(
          null,
          initialState.taskList.map((item) => item.id)
        ) + 1;

      newTask.id = idMax;
    } else {
      newTask.id = 1;
    }

    dispatch({
      type: "addNewTask",
      payload: newTask,
    });

    handleToCalendar();
  };

  const handleChangeTaskList = (newTask) => {
    /* находим по id элемент и перезаписываем */

    let changeTaskindex = state.taskList.findIndex(
      (item) => item.id == newTask.id
    );

    dispatch({
      type: "changeTask",
      payload: newTask,
      index: changeTaskindex,
    });
    handleToCalendar();
  };

  const handleDeleteTask = (task) => {
    dispatch({
      type: "deleteTask",
      payload: task,
    });

    handleToCalendar();
    /*пришла таска
      ищем ее id и удаляем!*/
    /*   setState(
      (state) => {
        return {
          taskList: state.taskList.filter((item, i) => {
            return item.id !== task.id;
          }),
        };
      },

      () => {
        selectCurrentTask();
        console.log(state.taskList);
        handleToCalendar();
      }
    ); */
  };

  const selectCurrentTask = () => {
    let selectDate = moment(state.selectDay).format("YYYY-MM-DD");
    let result = state.taskList.filter(
      //находим item для которого выбранная дата лежит
      //между начальной и конечной датой задачи
      (item) =>
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

    return result;
  };

  const onTaskClick = (value) => {
    dispatch({
      type: "setCurrTask",
      payload: value,
    });
    debugger;
    props.history.push(`/tasks/${value.name}`);
    return value;
  };

  return (
    <Switch>
      <Route path="/" exact>
        <CalendarPage
          state={state}
          hahdleChangeSelectDay={dispatch}
          hrefNewTask={hrefNewTask}
          onTaskClick={onTaskClick}
          currentTaskList={selectCurrentTask()}
        />
      </Route>
      <Route path="/newTask">
        <TaskCard
          startInputTitle={startInputTitle}
          endInputTitle={endInputTitle}
          onChangeTaskList={handleAddNewTask}
          handleDeleteTask={handleDeleteTask}
        />
      </Route>
      <Route path="/tasks/:name">
        <TaskCard
          startInputTitle={startInputTitle}
          endInputTitle={endInputTitle}
          сurrTask={state.currTask}
          onChangeTaskList={handleChangeTaskList}
          handleDeleteTask={handleDeleteTask}
        />
      </Route>
      <Route patch="/UndoRedo">
        <UndoRedo />
      </Route>
    </Switch>
  );
}

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.querySelector("#root")
);
