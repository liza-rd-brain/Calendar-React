import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

const NavWrap = styled.div`
  width: 100%;
  height: 50px;
  /*  background-color: #fff; */
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
const NavTitle = styled.div`
  width: 80%;
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
  /*без плагина для стилизации*/
  /*  & :first-child {
    transform: rotate(180deg);
    top: 4px;
  } */
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
  const renderArrow = (direction) => {
    return (
      <Arrow onClick={() => props.onArrowClick(direction, props.name)}></Arrow>
    );
  };

  return (
    <ThemeProvider theme={commonStyle}>
      <NavWrap>
        <NavTitle onClick={props.onTitleClick}>{props.title}</NavTitle>
        <ArrowWrap>
          {renderArrow("left")}
          {renderArrow("right")}
        </ArrowWrap>
      </NavWrap>
    </ThemeProvider>
  );
}

export default Nav;
