import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import TaskTitle from "./TaskTitle/TaskTitle";

export default class TaskList extends React.Component {
  render() {
    return (
      <div className="taskList">
        <TaskTitle
          selectDay={this.props.selectDay}
          today={this.props.today}
          month={this.props.month}
          year={this.props.year}
        />
        <Link
          target="_blank"
          to="newTask" /* to={this.props.href} */
        >
          +
        </Link>
        {/*    <a
          target="_blank"
          href="http://localhost:8080/newTask" onClick={this.props.onClickNewTask}
        >
          +
        </a> */}
      </div>
    );
  }
}
