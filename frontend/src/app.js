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
const WaitingText = styled.div`
  color: white;
`;

const initialState = {
  calendarState: "unactive",
  today: new Date(),
  selectDay: new Date(),
  dayInFocus: new Date(),
  mode: "calendar",
  taskList: [{ id: 1 }],
  /*  taskList: [
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
  ], */
  currTaskId: {
    /* name: 1 */
  },
  sendingTask: null,
  time: moment().format("LTS"),
};

const reducer = (state = initialState, action) => {
  const calendarState = state.calendarState;

  switch (action.type) {
    case "setMode":
      return { ...state, mode: action.payload, currTaskId: action.number };
  }

  switch (calendarState) {
    case "unactive": {
      switch (action.type) {
        case "activated": {
          return {
            ...state,
            calendarState: "waitingData",
          };
        }
        default:
          return state;
      }
    }

    case "waitingData": {
      switch (action.type) {
        case "addData": {
          return {
            ...state,
            taskList: action.payload,
            calendarState: "calendarRendered",
          };
        }
        default:
          return state;
      }
    }

    case "sendingData": {
      switch (action.type) {
        case "addData": {
          return {
            ...state,
            taskList: action.payload,
            calendarState: "waitingData",
          };
        }
        default:
          return state;
      }
    }
    case "calendarRendered": {
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
            calendarState: "sendingData",
            sendingTask: action.payload,
          };
        /*  return {
            ...state,
            taskList: [...state.taskList.concat(action.payload)],
          }; */
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

        default:
          return state;
      }
    }
    default:
      return state;
  }
};

function App() {
  const dispatch = useDispatch();
  const { calendarState, today, mode, currTaskId, sendingTask } = useSelector(
    (state) => state
  );
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

  //включение календаря
  useEffect(function initiateData() {
    switch (calendarState) {
      case "unactive": {
        dispatch({ type: "activated" });
      }
      default:
        break;
    }
  });

  useEffect(
    function addData() {
      switch (calendarState) {
        case "waitingData": {
          let promise = fetch("http://localhost:3000");

          promise
            .then((res) => res.json())
            .then((res) => dispatch({ type: "addData", payload: res.tasks }));
          break;
        }
        case "sendingData": {
          console.log(sendingTask);

          let promise = fetch("http://localhost:3000", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendingTask),
          });
          promise
            .then((res) => res.json())
            .then((res) => {
              dispatch({ type: "addData", payload: res.tasks });
            });

          break;
        }
        case "calendarRendered": {
          dispatch({
            type: "setMode",
            payload: "calendar",
          });
          break;
        }
        default:
          break;
      }
    },
    [calendarState]
  );

  useEffect(
    function updateCurrDate() {
      dispatch({ type: "addDate", payload: new Date() });
    },
    [moment(today).day()]
  );

  useEffect(
    function changeRoute() {
      history.push(switchRoute());
    },
    [mode]
  );

  const switchRoute = () => {
    switch (mode) {
      case "tasks":
        return `/tasks/${currTaskId}`;
      case "newTask":
        return "/newTask";
      case "calendar":
        return "/";
      default:
        return "/";
    }
  };

  const getCalendarScreen = () => {
    switch (calendarState) {
      case "waitingData": {
        return <WaitingScreen />;
      }

      case "calendarRendered": {
        return (
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
        );
      }
    }
  };
  return (
    <ThemeProvider theme={commonStyle}>
      <Container>{getCalendarScreen()}</Container>
    </ThemeProvider>
  );
}

function WaitingScreen() {
  return <WaitingText>ждем данные</WaitingText>;
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
