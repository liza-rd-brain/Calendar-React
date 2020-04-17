import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

const TaskList = styled.div`
  min-height: 100px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskTitle = styled.div`
  color: ${(props) => props.theme.commonStyle.lightgray};
`;

const NewTaskLink = styled(Link)`
  color: ${(props) => props.theme.commonStyle.lightgray};
  text-decoration: none;
  cursor: pointer;
  font-size: 25px;
  &:hover {
    color: ${(props) => props.theme.commonStyle.white};
  }
`;

const List = styled.div``;

const TaskLink = styled.p`
  text-decoration: none;
  color: ${(props) => props.theme.commonStyle.lightgray};
  &:hover {
    color: ${(props) => props.theme.commonStyle.white};
  }
`;

export default function (props) {
  const getList = props.taskList.map((item) => {
    return (
      <TaskLink
        className="link"
        key={item.id}
        onClick={() => props.onTaskClick(item.id)}
      >
        {item.name}
      </TaskLink>
    );
  });

  const titleText =
    moment(props.selectDay).format("LL") === moment(props.today).format("LL")
      ? "Сегодня"
      : `${moment(props.selectDay).format("dddd DD")} `;

  return (
    <ThemeProvider theme={commonStyle}>
      <TaskList>
        <TaskHeader>
          <TaskTitle>{titleText}</TaskTitle>
          <NewTaskLink to={props.hrefNewTask}>+</NewTaskLink>
        </TaskHeader>

        <List>{getList}</List>
      </TaskList>
    </ThemeProvider>
  );
}
