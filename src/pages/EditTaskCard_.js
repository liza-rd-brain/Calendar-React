import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

import moment from "moment";
import DateTimeInput from "../features/DateTimeInput/DateTimeInput";

const nameValue = "name";
const descValue = "desc";
const startDateValue = "startDate";
const startTimeValue = "startTime";
const endDateValue = "endDate";
const endTimeValue = "endTime";

class EditTaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.input = React.createRef();
  }

  handleEditTask(event) {
    debugger;
    console.log(event);
    const name = event.target.name;
    this.input = event.target.value;

    switch (name) {
      case nameValue:
        /* setTaskname(currValue); */
        break;
      /* case descValue:
        setTaskDesc(currValue);
        break;
      case startDateValue:
        setTaskStartDate(currValue);
        break;
      case startTimeValue:
        setTaskStartTime(currValue);
        break;
      case endDateValue:
        setTaskEndDate(currValue);
        break;
      case endTimeValue:
        setTaskEndTime(currValue);
        break; */
      default:
        console.log("Error!");
    }
  }

  handleSaveTask(event) {
    event.preventDefault();

    let task = {
      name: this.input
      /*  desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime */
    };

    this.props.onChangeTaskList(task, this.props.action);
  }

  handleChangeTask() {
    debugger;
    console.log("изменяем задачу");
    event.preventDefault();

    let task = {
      id: this.props.сurrTask.id,
      name: taskName,
      desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime
    };

    this.props.onChangeTaskList(task);
  }

  /*пришел заполненный элемент!!
    его обновлять или удалять */
  /*  componentDidMount() {
 
     if (this.props.сurrTask) {
      editForm = fillForm();
    }
  } */

  fillForm() {
    /*   console.log("заполнить форму!"); */
    /* setTaskname(this.props.сurrTask.name);
    setTaskDesc(this.props.сurrTask.desc);
    setTaskStartTime(this.props.сurrTask.startTime);
    setTaskStartDate(this.props.сurrTask.startDate);
    setTaskEndTime(this.props.сurrTask.endTime);
    setTaskEndDate(this.props.сurrTask.endDate); */
  }

  /*   fillForm(); */
  render() {
    return (
      <form className="form" onSubmit={this.handleChangeTask}>
        {/*  {this.props.сurrTask ? fillForm() : null} */}
        <input
          required
          name={nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={this.handleEditTask}
          value={this.props.сurrTask.name}
          ref={this.input}
        />
        <DateTimeInput
          class="start"
          title={this.props.startInputTitle}
          dateName={startDateValue}
          timeName={startTimeValue}
          dateValue={this.props.сurrTask.startDate}
          timeValue={this.props.сurrTask.startTime}
          onChange={this.handleEditTask}
        />
        <DateTimeInput
          class="end"
          title={this.props.endInputTitle}
          dateName={endDateValue}
          timeName={endTimeValue}
          dateValue={this.props.сurrTask.endDate}
          timeValue={this.props.сurrTask.endTime}
          onChange={this.handleEditTask}
        />
        <textarea
          className="textarea"
          name={descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          onChange={this.handleEditTask}
          value={this.props.сurrTask.desc}
        />
        <div className="button_wrap">
          <input className="button" type="submit" value="сохранить" />
          <input
            className="button"
            type="button"
            value="удалить"
            onClick={() => this.props.handleDeleteTask(this.props.сurrTask)}
          />
        </div>
      </form>
    );
  }
}

export default withRouter(EditTaskCard);
