import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import DateTimeInput from "../../components/DateTimeInput/DateTimeInput";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskName: "",
      newTaskDesc: "",
      newTaskStartTime: "",
      newTaskStartDate: "",
      newTaskEndTime: "",
      newTaskEndDate: ""
    };
    this.nameValue = "name";
    this.descValue = "desc";
    this.startDateValue = "startDate";
    this.startTimeValue = "startTime";
    this.endDateValue = "endDate";
    this.endTimeValue = "endTime";
    this.handleChangeNewTask = this.handleChangeNewTask.bind(this);
    this.handleSaveNewTask = this.handleSaveNewTask.bind(this);
  }

  handleChangeNewTask(event) {
    const name = event.target.name;

    /* debugger; */
    switch (name) {
      case "name":
        this.setState({
          newTaskName: event.target.value
        });
        break;
      case "desc":
        this.setState({
          newTaskDesc: event.target.value
        });
        break;
      case "startDate":
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      case "startTime":
        this.setState({
          newTaskStartTime: event.target.value
        });
        break;
      case "endDate":
        this.setState({
          newTaskEndDate: event.target.value
        });
        break;
      case "endTime":
        this.setState({
          newTaskEndTime: event.target.value
        });
        break;
      default:
        console.log("Error!");
    }
  }

  handleSaveNewTask(event) {
    event.preventDefault();

    /* debugger; */
    let newTask = {
      name: this.state.newTaskName,
      desc: this.state.newTaskDesc,
      startDate: this.state.newTaskStartDate,
      startTime: this.state.newTaskStartTime,
      endDate: this.state.newTaskEndDate,
      endTime: this.state.newTaskEndTime
    };

    this.props.onChangeTaskList(newTask);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSaveNewTask}>
        <input
          name={this.nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={this.handleChangeNewTask}
        />

        <DateTimeInput
          class="start"
          title={this.props.startInputTitle}
          dateValue={this.startDateValue}
          timeValue={this.startTimeValue}
          onChange={this.handleChangeNewTask}
        />

        <DateTimeInput
          class="end"
          title={this.props.endInputTitle}
          dateValue={this.endDateValue}
          timeValue={this.endTimeValue}
          onChange={this.handleChangeNewTask}
        />

        <textarea
          className="textarea"
          name={this.descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          onChange={this.handleChangeNewTask}
        />
        <input className="button" type="submit" value="сохранить" />
      </form>
    );
  }
}

export default TaskCard;
