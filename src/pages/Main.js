import React from "react";

import Timer from "../features/Timer";
import TaskList from "../features/TaskList";
import Calendar from "../features/Calendar";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";
moment.locale("ru");
import * as commonStyle from "./../theme";

const ContainerCalendar = styled.div`
  width: 400px;

  & > * {
    border: 1px solid;
    border-color: ${(props) => props.theme.commonStyle.gray};
  }
  flex-direction: column;
`;

export default function Main({
  state,
  hahdleChangeSelectDay,
  hrefNewTask,
  onTaskClick,
  currentTaskList,
}) {
  return (
    <ThemeProvider theme={commonStyle}>
      <ContainerCalendar>
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
      </ContainerCalendar>
    </ThemeProvider>
  );
}
