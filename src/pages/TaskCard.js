import React, { useState } from "react";
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

function TaskCard(props) {
  const [taskName, setTaskname] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const handleEditTask = event => {
    debugger;
    const name = event.target.name;
    const currValue = event.target.value;

    switch (name) {
      case nameValue:
        setTaskname(currValue);
        break;
      case descValue:
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
        break;
      default:
        console.log("Error!");
    }
  };

  const handleSaveTask = event => {
    event.preventDefault();

    let task = {
      name: taskName,
      desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime
    };

    props.onChangeTaskList(task, props.action);
  };

  const handleChangeTask = () => {
    debugger;
    console.log("изменяем задачу");
    event.preventDefault();

    /*отличие =id*/

    let task = {
      id: props.сurrTask.id,
      name: taskName,
      desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime
    };

    props.onChangeTaskList(task);
  };

  /*пришел заполненный элемент!!
    его обновлять или удалять */
  /*  componentDidMount() {
 
     if (props.сurrTask) {
      editForm = fillForm();
    }
  } */

  const fillForm = () => {
    /*   console.log("заполнить форму!"); */

    setTaskname(props.сurrTask.name);
    setTaskDesc(props.сurrTask.desc);
    setTaskStartTime(props.сurrTask.startTime);
    setTaskStartDate(props.сurrTask.startDate);
    setTaskEndTime(props.сurrTask.endTime);
    setTaskEndDate(props.сurrTask.endDate);
  };

  /*   fillForm(); */

  return (
    <form
      className="form"
      onSubmit={props.сurrTask ? handleChangeTask : handleSaveTask}
    >
      {/*  {props.сurrTask ? fillForm() : null} */}
      <input
        required
        name={nameValue}
        type="text"
        placeholder="Название задачи"
        onChange={handleEditTask}
        value={/* props.сurrTask ? props.сurrTask.name :  */ taskName}
      />
      <DateTimeInput
        class="start"
        title={props.startInputTitle}
        dateName={startDateValue}
        timeName={startTimeValue}
        dateValue={
          /* props.сurrTask ? props.сurrTask.startDate : */ taskStartDate
        }
        timeValue={
          /* props.сurrTask ? props.сurrTask.startTime : */ taskStartTime
        }
        onChange={handleEditTask}
      />
      <DateTimeInput
        class="end"
        title={props.endInputTitle}
        dateName={endDateValue}
        timeName={endTimeValue}
        dateValue={/* props.сurrTask ? props.сurrTask.endDate : */ taskEndDate}
        timeValue={/* props.сurrTask ? props.сurrTask.endTime : */ taskEndTime}
        onChange={handleEditTask}
      />
      <textarea
        className="textarea"
        name={descValue}
        col="50"
        row="20"
        placeholder="Описание задачи"
        onChange={handleEditTask}
        value={/* props.сurrTask ? props.сurrTask.desc : */ taskDesc}
      />
      <div className="button_wrap">
        <input className="button" type="submit" value="сохранить" />
        <input
          className="button"
          type="button"
          value="удалить"
          onClick={() => props.handleDeleteTask(props.сurrTask)}
        />
      </div>
    </form>
  );
}

export default withRouter(TaskCard);
