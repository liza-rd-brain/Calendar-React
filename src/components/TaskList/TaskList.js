import React from "react";

export default class TaskList extends React.Component {
  render() {
    return <div className="taskList">Дата:{this.props.selectDay}</div>;
  }
}
