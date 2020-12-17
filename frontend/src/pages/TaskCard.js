import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

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
const startInputTitle = "Дата начала";
const endInputTitle = "Дата окончания";

function TaskCard() {
  const [taskList, currTaskId] = useSelector((state) => [
    state.taskList,
    state.currTaskId,
  ]);
  const dispatch = useDispatch();

  const [taskName, setTaskname] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const currTask = taskList.find((item) => {
    return item.id === currTaskId || "";
  });

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

  const handleToCalendar = () => {
    dispatch({
      type: "setMode",
      payload: "calendar",
    });
  };

  const createNewTaskId = () => {
    if (taskList.length) {
      let idMax =
        Math.max.apply(
          null,
          taskList.map((item) => item.id)
        ) + 1;
      return idMax;
    } else {
      return 1;
    }
  };

  const handleSaveTask = (event) => {
    event.preventDefault();

    let task = {
      id: currTask ? currTask.id : createNewTaskId(),
      name: taskName || currTask.name,
      desc: taskDesc || currTask.desc,
      startDate: taskStartDate || currTask.startDate,
      startTime: taskStartTime || currTask.startTime,
      endDate: taskEndDate || currTask.endDate,
      endTime: taskEndTime || currTask.endTime,
    };
    currTask
      ? dispatch({
          type: "changeTask",
          payload: task,
        })
      : dispatch({
          type: "addNewTask",
          payload: task,
        });

    handleToCalendar();
  };

  const handleDeleteTask = () => {
    dispatch({
      type: "deleteTask",
      payload: currTask,
    });
    handleToCalendar();
  };

  return (
    <Form onSubmit={handleSaveTask}>
      <input
        required
        name={nameValue}
        type="text"
        placeholder="Название задачи"
        onChange={handleEditTask}
        value={currTask ? taskName || currTask.name : taskName}
      />
      <DateTimeInput
        title={startInputTitle}
        dateName={startDateValue}
        timeName={startTimeValue}
        dateValue={
          currTask ? taskStartDate || currTask.startDate : taskStartDate
        }
        timeValue={
          currTask ? taskStartTime || currTask.startTime : taskStartTime
        }
        onChange={handleEditTask}
      />
      <DateTimeInput
        title={endInputTitle}
        dateName={endDateValue}
        timeName={endTimeValue}
        dateValue={currTask ? taskEndDate || currTask.endDate : taskEndDate}
        timeValue={currTask ? taskEndTime || currTask.endTime : taskEndTime}
        onChange={handleEditTask}
      />
      <textarea
        className="textarea"
        name={descValue}
        col="50"
        row="20"
        placeholder="Описание задачи"
        onChange={handleEditTask}
        value={currTask ? taskDesc || currTask.desc : taskDesc}
      />
      <div className="button_wrap">
        <input className="button" type="submit" value="сохранить" />
        <input
          className="button"
          type="button"
          value="удалить"
          onClick={currTask ? handleDeleteTask : handleToCalendar}
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
