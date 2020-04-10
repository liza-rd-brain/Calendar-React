import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";


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

  const titleText =
    moment(props.selectDay).format("LL") === moment(props.today).format("LL")
      ? "Сегодня"
      : `${moment(props.selectDay).format("dddd DD")} `;

  return (
    <div className="taskList">
      <div className="taskTitle">{titleText}</div>
      <Link className="link" to={props.hrefNewTask}>
        +
      </Link>
      <div className="list">{getList}</div>
    </div>
  );
}
