import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";

import moment from "moment";

import CalendarPage from "./pages/Main";
import TaskCard from "./pages/TaskCard";
import UndoRedo from "./test/UndoRedo";

import * as commonStyle from "./theme";
import "./style.css";

moment.locale("ru");

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  background-color: ${(props) => props.theme.commonStyle.background};
  /*как тут передать пропс?!*/
  & > * {
    border: 1px solid;
    border-color: ${(props) => props.theme.commonStyle.gray};
  }
`;

const hrefNewTask = "newTask";
const startInputTitle = "Дата начала";
const endInputTitle = "Дата окончания";

const initialState = {
  today: new Date(),
  selectDay: new Date(),
  taskList: [
    {
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
    },
  ],
  currTaskId: {
    /* name: 1 */
  },
  time: moment().format("LTS"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeSelectDay":
      return {
        ...state,
        selectDay: action.payload,
      };

    case "setCurrTaskList":
      return {
        ...state,
        currtaskList: action.payload,
      };
    case "setCurrTaskId":
      return {
        ...state,
        currTaskId: action.payload,
      };
    case "addNewTask":
      return {
        ...state,
        taskList: [...state.taskList.concat(action.payload)],
      };
    case "changeTask":
      return {
        ...state,
        taskList: state.taskList.map((item, i) => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case "deleteTask":
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

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const updateTimeID = setInterval(
      () => dispatch({ type: "setTime", payload: moment().format("LTS") }),
      1000
    );

    return () => {
      clearInterval(updateTimeID);
    };
  }, []);

  useEffect(() => {
    const updateID = setInterval(
      () => dispatch({ type: "setDate", payload: new Date() }),
      1000
    );

    return () => {
      clearInterval(updateID);
    };
  }, [state.today.getDate()]);

  const newTaskId = () => {
    if (state.taskList.length) {
      let idMax =
        Math.max.apply(
          null,
          state.taskList.map((item) => item.id)
        ) + 1;
      return idMax;
    } else {
      return 1;
    }
  };

  const selectCurrentTask = () => {
    /*  debugger; */
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

  const onTaskClick = (id) => {
    dispatch({
      type: "setCurrTaskId",
      payload: id,
    });
    handleToTask(id);
  };

  const getCurrTaskId = () => {
    let task = state.taskList.find((item) => {
      return item.id === state.currTaskId || "";
    });
    return task;
  };

  const handleToCalendar = () => {
    props.history.push("/");
  };

  const handleToTask = (value) => {
    props.history.push(`/tasks/${value}`);
  };

  return (
    <ThemeProvider theme={commonStyle}>
      <Container>
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
              onChangeTaskList={dispatch}
              handleDeleteTask={dispatch}
              newTaskId={newTaskId()}
              handleToCalendar={handleToCalendar}
            />
          </Route>
          <Route path="/tasks/:name">
            <TaskCard
              startInputTitle={startInputTitle}
              endInputTitle={endInputTitle}
              сurrTask={getCurrTaskId()}
              onChangeTaskList={dispatch}
              handleDeleteTask={dispatch}
              handleToCalendar={handleToCalendar}
              /* handleToTask={handleToTask} */
            />
          </Route>
          <Route patch="/UndoRedo">
            <UndoRedo />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.querySelector("#root")
);
