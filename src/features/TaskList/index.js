import React from "react";
import { Link } from "react-router-dom";

import TaskTitle from "./TaskTitle";

export default function (props) {
  
  const getList = props.taskList.map((item) => {
    return (
      <div key={item.id} className="link">
        <p className="link" onClick={() => props.onTaskClick(item)}>
          {item.name}
        </p>
      </div>
    );
  });

  return (
    <div className="taskList">
      <TaskTitle selectDay={props.selectDay} today={props.today} />
      <Link className="link" to={props.hrefNewTask}>
        +
      </Link>
      <div className="list">{getList}</div>
    </div>
  );
}
