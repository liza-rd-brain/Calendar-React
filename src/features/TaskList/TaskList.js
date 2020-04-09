import React from "react";
import { Link } from "react-router-dom";

import TaskTitle from "./TaskTitle/TaskTitle";
import List from "./List/List";

export default function (props) {
  return (
    <div className="taskList">
      <TaskTitle selectDay={props.selectDay} today={props.today} />
      <Link className="link" to={props.hrefNewTask}>
        +
      </Link>
      <List taskList={props.taskList} onTaskClick={props.onTaskClick} />
    </div>
  );
}
