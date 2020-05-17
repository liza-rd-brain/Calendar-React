import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as commonStyle from "./../../theme";

import moment from "moment";
const NavWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
`;
const NavTitle = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.commonStyle.lightgray};
  &:hover {
    color: ${(props) => props.theme.commonStyle.white};
  }
`;
const ArrowWrap = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Arrow = styled.div`
  /*  width: 50%; */
  position: relative;
  cursor: pointer;
  /* color: ${(props) => props.theme.commonStyle.lightgray}; */
  padding: 10px;

   & :first-child {
    transform: rotate(180deg);
    top: 4px;
  }
  &:hover {
    &:after {border-color: ${(props) => props.theme.commonStyle.white};}
 
  }
  &:before {
    content: "";
    border: 6px solid;
    border-color: ${(props) => props.theme.commonStyle.background};
    position: absolute;
    top: 1px;
    transform: rotate(45deg);
    z-index: 2;  

  }
  &:after {
    content: "";
    border: 6px solid rgba(31, 32, 65, 0.5);
    border-color: ${(props) => props.theme.commonStyle.lightgray};
    position: absolute;
    top: 3px;
    transform: rotate(45deg);

  }
`;

function Nav(props) {
  const [mode, today, date] = useSelector((state) => [
    state.mode,
    state.today,
    state.selectDay,
  ]);
  const dispatch = useDispatch();

  const createNavTitle = () => {
    const currDate = date || today;
    const monthName = moment(currDate).format("MMMM");
    const currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);

    const currYear = moment(currDate).format("YYYY");
    /*   let index = Math.round((currYear - props.startYear) / props.yearInc)-1; */
    /*   let currStartYear = props.startYear + props.yearInc * index; */
    const yearsString = `${props.startYear}-${
      props.startYear + props.yearInc - 1
    }`;

    switch (mode) {
      case "calendar":
        return `${currentMonthName} ${currYear}`;
      case "month":
        return currYear;
      case "year":
        return yearsString;
      default:
        break;
    }
  };

  const renderArrow = (direction) => {
    return <Arrow onClick={() => props.onArrowClick(direction, mode)}></Arrow>;
  };

  const changeMode = () => {
    switch (mode) {
      case "calendar":
        return "month";
      case "month":
        return "year";
      case "year":
        return "year";
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={commonStyle}>
      <NavWrap>
        <NavTitle
          onClick={() => {
            dispatch({ type: "setMode", payload: changeMode() });
          }}
        >
          {createNavTitle()}
        </NavTitle>
        <ArrowWrap>
          {renderArrow("left")}
          {renderArrow("right")}
        </ArrowWrap>
      </NavWrap>
    </ThemeProvider>
  );
}

export default Nav;
