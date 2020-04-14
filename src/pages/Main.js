import React from "react";

import Timer from "../features/Timer";
import TaskList from "../features/TaskList";
import Calendar from "../features/Calendar";

import moment from "moment";
moment.locale("ru");

export default function Main({
  state,
  hahdleChangeSelectDay,
  hrefNewTask,
  onTaskClick,
  currentTaskList,
}) {
  return (
    <>
      <Timer today={state.today} time={state.time} />
      <Calendar
        today={state.today}
        onChangeSelectDay={hahdleChangeSelectDay}
        selectDay={state.selectDay}
      
      ></Calendar>
      <TaskList
        today={state.today}
        selectDay={state.selectDay}
        hrefNewTask={hrefNewTask}
        taskList={currentTaskList}
        onTaskClick={onTaskClick}
      />
    </>
  );
}
