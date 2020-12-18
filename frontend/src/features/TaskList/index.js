import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

const TaskList = styled.div`
  /* min-height: 100px; */
  height: 250px;
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

const NewTaskLink = styled.p`
  color: ${(props) => props.theme.commonStyle.lightgray};
  text-decoration: none;
  cursor: pointer;
  font-size: 25px;
  margin: 0;
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

export default function () {
  const dispatch = useDispatch();
  const [taskList, selectDay, today, dayInFocus] = useSelector((state) => [
    state.taskList,
    state.selectDay,
    state.today,
    state.dayInFocus,
  ]);

  const selectCurrentTask = () => {
    let selectDate = moment(dayInFocus).format("YYYY-MM-DD");
    let result = taskList.filter(
      //находим item для которого выбранная дата лежит
      //между начальной и конечной датой задачи
      (item) =>
        moment(selectDate).isBetween(item.startDate, item.endDate, null, "[]")
    );

    result.sort((firstItem, secondItem) => {
      if (
        +firstItem.startTime.slice(0, 2) < +secondItem.startTime.slice(0, 2)
      ) {
        return -1;
      }
      if (
        +firstItem.startTime.slice(0, 2) > +secondItem.startTime.slice(0, 2)
      ) {
        return +1;
      }
    });

    return result;
  };

  const getList = selectCurrentTask().map((item) => {
    return (
      <TaskLink
        className="link"
        key={item.id}
        /*роутинг*/
        onClick={() => {
          dispatch({
            type: "setCurrTaskId",
            payload: item.id,
          }),
            dispatch({
              type: "setMode",
              payload: "tasks",
              number: item.id,
            });
        }}
      >
        {item.name}
      </TaskLink>
    );
  });

  const titleText =
    moment(dayInFocus).format("LL") === moment(today).format("LL")
      ? "Сегодня"
      : `${moment(dayInFocus).format("dddd DD")} `;

  return (
    <ThemeProvider theme={commonStyle}>
      <TaskList>
        <TaskHeader>
          <TaskTitle>{titleText}</TaskTitle>
          <NewTaskLink
            onClick={() => {
              dispatch({ type: "setMode", payload: "newTask" });
            }}
          >
            +
          </NewTaskLink>
        </TaskHeader>

        <List>{getList}</List>
      </TaskList>
    </ThemeProvider>
  );
}
