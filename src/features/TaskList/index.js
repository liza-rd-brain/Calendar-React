import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const [taskList, selectDay, today] = useSelector((state) => [
    state.taskList,
    state.selectDay,
    state.today,
  ]);
  const getList = taskList.map((item) => {
    return (
      <TaskLink
        className="link"
        key={item.id}
        /*роутинг*/
        onClick={() => props.onTaskClick(item.id)}
      >
        {item.name}
      </TaskLink>
    );
  });

  const titleText =
    moment(selectDay).format("LL") === moment(today).format("LL")
      ? "Сегодня"
      : `${moment(selectDay).format("dddd DD")} `;

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
