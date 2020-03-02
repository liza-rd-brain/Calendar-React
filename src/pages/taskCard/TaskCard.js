import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
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
      case this.nameValue:
        this.setState({
          newTaskName: event.target.value
        });
        break;
      case this.descValue:
        this.setState({
          newTaskDesc: event.target.value
        });
        break;
      case this.startDateValue:
        this.setState({
          newTaskStartDate: event.target.value
        });
        break;
      case this.startTimeValue:
        this.setState({
          newTaskStartTime: event.target.value
        });
        break;
      case this.endDateValue:
        this.setState({
          newTaskEndDate: event.target.value
        });
        break;
      case this.endTimeValue:
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

    debugger;
    let newTask = {
      name: this.state.newTaskName,
      desc: this.state.newTaskDesc,
      startDate: this.state.newTaskStartDate,
      startTime: this.state.newTaskStartTime,
      endDate: this.state.newTaskEndDate,
      endTime: this.state.newTaskEndTime
    };

    this.props.onChangeTaskList(newTask, this.action);
  }
  componentDidMount() {
  /*   debugger; */
    /*пришел заполненный элемент!!
    его обновлять или удалять */
    if (this.props.сurrTask) {
      this.fillForm();
      this.action = "edit";
    } else this.action = "create";
  }

  fillForm() {
    console.log("заполнить форму!");
    this.setState({
      newTaskName: this.props.сurrTask.name,
      newTaskDesc: this.props.сurrTask.desc,
      newTaskStartTime: this.props.сurrTask.startTime,
      newTaskStartDate: this.props.startDate,
      newTaskEndTime: this.props.endDate,
      newTaskEndDate: this.props.endTime
    });
  }

  render() {
    /*  console.log(this.props.сurrTask); */
    /* let { name } = this.props.сurrTask; */

    return (
      <form className="form" onSubmit={this.handleSaveNewTask}>
        <input
          name={this.nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={this.handleChangeNewTask}
          value={this.state.newTaskName}
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
          value={this.state.newTaskDesc}
        />
        <input className="button" type="submit" value="сохранить" />
      </form>
    );
  }
}

export default TaskCard;
