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
  time: moment().format("LTS"),
};

function App(props) {
  const reducer = (state, action) => {
    /*  debugger; */
    switch (action.type) {
      case "changeSelectDay":
        return {
          ...state,
          selectDay: action.payload,
        };

      case "addNewTask":
        return {
          ...state,
          taskList: [
            ...state.taskList.concat(action.payload),
          ] /* taskList.concat(action.payload), */,
        };
      case "setCurrTaskList":
        return {
          ...state,
          currtaskList: action.payload,
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
    const updateID = setInterval(() => updateSystemDate(), 1000);
    const updateTimeID = setInterval(() => updateSystemTime(), 1000);
   /*  selectCurrentTask(); */
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
    if (initialState.taskList.length) {
      let id =
        Math.max.apply(
          null,
          initialState.taskList.map((item) => item.id)
        ) + 1;

      newTask.id = id;
    } else {
      newTask.id = 1;
    }

    dispatch({
      type: "addNewTask",
      payload: newTask,
    });

    handleToCalendar();
    /*   setState(
      (state) => {
        return { taskList: state.taskList.concat(newTask) };
      },
      () => {
        selectCurrentTask(), console.log(state.taskList);
        handleToCalendar();
      }
    ); */
  };

  const handleChangeTaskList = (newTask) => {
    /* находим по id элемент и перезаписываем */

    let changeTaskindex = initialState.taskList.findIndex(
      (item) => item.id == newTask.id
    );

    /*   setState(
      (state) => {
        return {
          taskList: state.taskList.map((item, i) => {
            if (i === changeTaskindex) {
              return newTask;
            } else {
              return item;
            }
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

  const handleDeleteTask = (task) => {
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

  /*жизненный цикл в классовом компоненте?!??! */
  /* componentDidMount() {
   updateID = setInterval(() =>updateSystemDate(), 1000);
   updateTimeID = setInterval(() =>updateSystemTime(), 1000);
   selectCurrentTask();
  } */
  /* componentWillUnmount() {
    clearInterval(updateID);
    clearInterval(updateTimeID);
  }*/

  const updateSystemDate = () => {
    /* setState({ today: new Date() }); */
    dispatch({ type: "setDate", payload: new Date() });
  };

  const updateSystemTime = () => {
    /*  setState({
      time: moment().format("LTS"),
    }); */
    dispatch({ type: "setTime", payload: moment().format("LTS") });
  };

  /*выдача сегодняшней задачи*/
  const selectCurrentTask = () => {
    debugger;
    let selectDate = moment(initialState.selectDay).format("YYYY-MM-DD");
    let result = initialState.taskList.filter(
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
    dispatch({ type: "setCurrTaskList", payload: result });
    /*  setState({
      currtaskList: result,
    }); */
    /*     console.log(result);
    console.log(moment(state.selectDay).format("YYYY-MM-DD")); */
  };

  const onTaskClick = (value) => {
    /*  setState(
      (state) => {
        return { currTask: value };
      },
      () => props.history.push(`/tasks/${value.name}`)
    );*/
  };

  return (
    <Switch>
      <Route path="/" exact>
        <CalendarPage
          state={state}
          hahdleChangeSelectDay={dispatch}
          hrefNewTask={hrefNewTask}
          onTaskClick={onTaskClick}
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
