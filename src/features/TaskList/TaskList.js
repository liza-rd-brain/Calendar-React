import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import TaskTitle from "./TaskTitle/TaskTitle";
import List from "./List/List";

export default class TaskList extends React.Component {
  render() {
    return (
      <div className="taskList">
        <TaskTitle
          selectDay={this.props.selectDay}
          today={this.props.today}
          /* month={this.props.month}
          year={this.props.year} */
        />
        <Link className="link" to={this.props.hrefNewTask}>
          +
        </Link>
        <List
          taskList={this.props.taskList}
          onTaskClick={this.props.onTaskClick}
        />
      </div>
    );
  }
}
