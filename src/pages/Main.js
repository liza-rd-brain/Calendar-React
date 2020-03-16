import React from "react";

import Timer from "../features/Timer";
import TaskList from "../features/TaskList/TaskList";
import Calendar from "../features/Calendar";

export default function Main({
  today,
  children,
  state,
  hahdleChangeSelectDay,
  handleChangeYear,
  handleChangeStartYear,
  handleIncStartYear,
  handleDecStartYear,
  yearInc,
  handleToCalendar,
  handleToMonthSelection,
  handleToYearSelection,
  hrefNewTask,
  onTaskClick
}) {
  return (
    <>
      <Timer today={today} time={state.time} />
      {children}
      <Calendar
        today={state.today}
        onChangeSelectDay={hahdleChangeSelectDay}
        onChangeYear={handleChangeYear}
        onChangeStartYear={handleChangeStartYear}
        onIncStartYear={handleIncStartYear}
        onDecStartYear={handleDecStartYear}
        startYear={state.startYear}
        yearInc={yearInc}
        startYear={state.startYear}
        onRouteToCalendar={handleToCalendar}
        onRouteToMonth={handleToMonthSelection}
        onRouteToYearh={handleToYearSelection}
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
