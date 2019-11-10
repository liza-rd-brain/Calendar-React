import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
/* import DaySelection from "./components/DaySelection";
import MonthSelection from "./components/MonthSelection";
import YearSelection from "./components/YearSelection"; */
import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList/TaskList";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Calendar />
        <TaskList />
      </>
    );
  }
}

/* export default withRouter(App); */
/* const ShowTheLocation = withRouter(App); */

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
