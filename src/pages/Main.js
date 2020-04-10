import React from "react";

import Timer from "../features/Timer";
import TaskList from "../features/TaskList";
import Calendar from "../features/Calendar";

import moment from "moment";
moment.locale("ru");

export default function Main({
  today,
  state,
  hahdleChangeSelectDay,
  hrefNewTask,
  onTaskClick,
}) {
  return (
    <>
      <Timer today={today} time={state.time} />
      <Calendar
        today={state.today}
        onChangeSelectDay={hahdleChangeSelectDay}
        selectDay={state.selectDay}
        hrefNewTask={hrefNewTask}
      ></Calendar>
      <TaskList
        today={state.today}
        selectDay={state.selectDay}
        hrefNewTask={hrefNewTask}
        taskList={state.currtaskList}
        onTaskClick={onTaskClick}
      />
    </>
  );
}
