import React, { useState } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

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

  const handleEditTask = (event) => {
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

  const handleSaveTask = (event) => {
    event.preventDefault();

    let task = {
      name: taskName,
      desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime,
    };

    props.onChangeTaskList(task, props.action);
  };

  const handleChangeTask = () => {
    event.preventDefault();

    let task = {
      id: props.сurrTask.id,
      name: taskName || props.сurrTask.name,
      desc: taskDesc || props.сurrTask.desc,
      startDate: taskStartDate || props.сurrTask.startDate,
      startTime: taskStartTime || props.сurrTask.startTime,
      endDate: taskEndDate || props.сurrTask.endDate,
      endTime: taskEndTime || props.сurrTask.endTime,
    };

    debugger;
    props.onChangeTaskList(task);
  };

  if (props.сurrTask) {
    return (
      <form className="form" onSubmit={handleChangeTask}>
        <input
          required
          name={nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={handleEditTask}
          value={taskName || props.сurrTask.name}
        />
        <DateTimeInput
          class="start"
          title={props.startInputTitle}
          dateName={startDateValue}
          timeName={startTimeValue}
          dateValue={taskStartDate || props.сurrTask.startDate}
          timeValue={taskStartTime || props.сurrTask.startTime}
          onChange={handleEditTask}
        />
        <DateTimeInput
          class="end"
          title={props.endInputTitle}
          dateName={endDateValue}
          timeName={endTimeValue}
          dateValue={taskEndDate || props.сurrTask.endDate}
          timeValue={taskEndTime || props.сurrTask.endTime}
          onChange={handleEditTask}
        />
        <textarea
          className="textarea"
          name={descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          onChange={handleEditTask}
          value={taskDesc || props.сurrTask.desc}
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
  } else {
    return (
      <form className="form" onSubmit={handleSaveTask}>
        <input
          required
          name={nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={handleEditTask}
          value={taskName}
        />
        <DateTimeInput
          class="start"
          title={props.startInputTitle}
          dateName={startDateValue}
          timeName={startTimeValue}
          dateValue={taskStartDate}
          timeValue={taskStartTime}
          onChange={handleEditTask}
        />
        <DateTimeInput
          class="end"
          title={props.endInputTitle}
          dateName={endDateValue}
          timeName={endTimeValue}
          dateValue={taskEndDate}
          timeValue={taskEndTime}
          onChange={handleEditTask}
        />
        <textarea
          className="textarea"
          name={descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          onChange={handleEditTask}
          value={taskDesc}
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
}

export default /* withRouter( */ TaskCard /* ) */;
