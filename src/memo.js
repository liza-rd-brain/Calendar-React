import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  background-color: white;
`;

const App = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const increaseCounter1 = React.useCallback(() => {
    setCount1((count1) => count1 + 1);
  }, []);

  const increaseCounter2 = React.useCallback(() => {
    setCount2((count2) => count2+ 1);
  }, []);

  return (
    <Container>
      <MemoCounter value={count1} onClick={increaseCounter1}>
        Counter 1
      </MemoCounter>
      <MemoCounter value={count2} onClick={increaseCounter2}>
        Coutner 2
      </MemoCounter>
    </Container>
  );
};

const Counter = ({ value, children, onClick }) => {
  console.log("Render: ", children);

  return (
    <button onClick={onClick}>
      {children}: {value}
    </button>
  );
};

const MemoCounter = React.memo(Counter);
ReactDOM.render(<App />, document.querySelector("#root"));
