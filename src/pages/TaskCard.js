import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
/* import DateTimeInput from "../features/DateTimeInput/DateTimeInput"; */

const Form = styled.form`
  align-items: center;
  width: 700px;
  padding: 20px;
  & > * {
    width: 90%;
    margin-bottom: 10px;
  }
`;

const InputBlock = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`;

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
      id: props.newTaskId,
      name: taskName,
      desc: taskDesc,
      startDate: taskStartDate,
      startTime: taskStartTime,
      endDate: taskEndDate,
      endTime: taskEndTime,
    };

    props.onChangeTaskList({
      type: "addNewTask",
      payload: task,
    });
    props.handleToCalendar();
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

    props.onChangeTaskList({
      type: "changeTask",
      payload: task,
    });
    props.handleToCalendar();
  };

  const handleDeleteTask = () => {
    props.handleDeleteTask({
      type: "deleteTask",
      payload: props.сurrTask,
    });
    props.handleToCalendar();
  };

  /* props.сurrTask ? props.handleToTask(props.сurrTask.value) : ""; */

  return (
    <Form onSubmit={props.сurrTask ? handleChangeTask : handleSaveTask}>
      <input
        required
        name={nameValue}
        type="text"
        placeholder="Название задачи"
        onChange={handleEditTask}
        value={props.сurrTask ? taskName || props.сurrTask.name : taskName}
      />
      <DateTimeInput
        /*     class="start" */
        title={props.startInputTitle}
        dateName={startDateValue}
        timeName={startTimeValue}
        dateValue={
          props.сurrTask
            ? taskStartDate || props.сurrTask.startDate
            : taskStartDate
        }
        timeValue={
          props.сurrTask
            ? taskStartTime || props.сurrTask.startTime
            : taskStartTime
        }
        onChange={handleEditTask}
      />
      <DateTimeInput
        /*  class="end" */
        title={props.endInputTitle}
        dateName={endDateValue}
        timeName={endTimeValue}
        dateValue={
          props.сurrTask ? taskEndDate || props.сurrTask.endDate : taskEndDate
        }
        timeValue={
          props.сurrTask ? taskEndTime || props.сurrTask.endTime : taskEndTime
        }
        onChange={handleEditTask}
      />
      <textarea
        className="textarea"
        name={descValue}
        col="50"
        row="20"
        placeholder="Описание задачи"
        onChange={handleEditTask}
        value={props.сurrTask ? taskDesc || props.сurrTask.desc : taskDesc}
      />
      <div className="button_wrap">
        <input className="button" type="submit" value="сохранить" />
        <input
          className="button"
          type="button"
          value="удалить"
          onClick={handleDeleteTask}
        />
      </div>
    </Form>
  );
}

function DateTimeInput(props) {
  return (
    <InputBlock>
      <p>{props.title}</p>
      <div className="dateTimeInput">
        <input
          required
          type="date"
          name={props.dateName}
          className="dateInput"
          onChange={props.onChange}
          value={props.dateValue}
        />
        <input
          required
          type="time"
          name={props.timeName}
          className="timeInput"
          onChange={props.onChange}
          value={props.timeValue}
        />
      </div>
    </InputBlock>
  );
}

export default TaskCard;
