import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

import moment from "moment";
moment.locale("ru");

import CalendarPage from "./pages/Main";
import TaskCard from "./pages/TaskCard";
import { /* {commonStyle} as */ commonStyle } from "./theme";
import "./style.css";

const Container = styled.div`
  display: flex;
  & > * {
    background-color: ${(props) => props.theme./* .commonStyle. */ background};
    margin: 0px auto;
  }
`;

const initialState = {
  today: new Date(),
  selectDay: new Date(),
  dayInFocus: new Date(),
  mode: "calendar",
  /*   taskList: [], */
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "changeSelectDay":
      return {
        ...state,
        selectDay: action.payload,
      };
    case "changeFocusDay":
      return {
        ...state,
        dayInFocus: action.payload,
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
    case "setMode":
      return { ...state, mode: action.payload, currTaskId: action.number };
    default:
      return state;
  }
};

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const history = useHistory();

  useEffect(function updateTime() {
    const id = setInterval(
      () => dispatch({ type: "setTime", payload: moment().format("LTS") }),
      1000
    );
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(
    function updateCurrDate() {
      dispatch({ type: "setDate", payload: new Date() });
    },
    [moment(state.today).day()]
  );

  useEffect(
    function changeRoute() {
      history.push(switchRoute());
    },
    [state.mode]
  );

  const switchRoute = () => {
    switch (state.mode) {
      case "tasks":
        return `/tasks/${state.currTaskId}`;
      case "newTask":
        return "/newTask";
      case "calendar":
        return "/";
      default:
        return "/";
    }
  };

  return (
    <ThemeProvider theme={commonStyle}>
      <Container>
        <Switch>
          <Route path="/" exact>
            <CalendarPage />
          </Route>
          <Route path="/newTask">
            <TaskCard />
          </Route>
          <Route path="/tasks/:name">
            <TaskCard />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

const store = createStore(reducer);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector("#root")
);
