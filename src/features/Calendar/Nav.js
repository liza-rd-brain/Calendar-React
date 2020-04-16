import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as commonStyle from "./../../theme";

const NavWrap = styled.div`
  width: 100%;
  height: 50px;
  /*  background-color: #fff; */
  display: flex;
  padding: 10px;
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
  justify-content: center;
  align-items: center;
  & :nth-child(1) {
    transform: rotate(270deg);
  }
`;
const Arrow = styled.div`
  width: 50%;
  position: relative;
  cursor: pointer;
  color: ${(props) => props.theme.commonStyle.lightgray};
  &:hover {
    color: ${(props) => props.theme.commonStyle.white};
  }
  &:before {
    content: "";
    border: 4px solid white;
    position: absolute;
    top: 1px;
    right: -15px;
    pointer-events: none;
    transform: rotate(45deg);
    z-index: 2;
  }
  &:after {
    content: "";
    border: 4px solid rgba(31, 32, 65, 0.5);
    position: absolute;
    top: 4px;
    right: -15px;
    pointer-events: none;
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
