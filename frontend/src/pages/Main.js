import React from "react";

import Timer from "../features/Timer";
import TaskList from "../features/TaskList";
import Calendar from "../features/Calendar";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";

import * as commonStyle from "./../theme";

const ContainerCalendar = styled.div`
  width: 400px;

  & > * {
    border: 1px solid;
    border-color: ${(props) => props.theme.commonStyle.gray};
  }
  flex-direction: column;
`;

export default function Main({ hrefNewTask, onTaskClick }) {
  return (
    <ThemeProvider theme={commonStyle}>
      <ContainerCalendar>
        <Timer />
        <Calendar />
        <TaskList hrefNewTask={hrefNewTask} onTaskClick={onTaskClick} />
      </ContainerCalendar>
    </ThemeProvider>
  );
}
