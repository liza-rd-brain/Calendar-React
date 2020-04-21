import React, { useReducer } from "react";

import "./undoRedo.css";
import styled, { css } from "styled-components";


const reducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "add":
      return {
        ...state,
        text: action.payload,
        history: {
          redo: [],
          undo: [...state.history.undo, state.text],
        },
      };
    case "undo":
      return {
        text: state.history.undo.pop() || "",
        history: {
          ...state.history,
          redo: [...state.history.redo, state.text],
        },
      };
    case "redo":
      return {
        text: state.history.redo.pop() || "",
        history: {
          ...state.history,
          undo: [...state.history.undo, state.text],
        },
      };
    default:
      console.error("Err");
  }
};

const initialState = {
  text: [],
  history: { undo: [], redo: [] },
};

const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 20px;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

function UndoRedo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="main">
      <input
        type="text"
        value={state.text}
        onChange={() => dispatch({ type: "add", payload: event.target.value })}
      />
      <div className="button_wrap">
        <button onClick={() => dispatch({ type: "undo" })}>Undo</button>
        <button onClick={() => dispatch({ type: "redo" })}>Redo</button>
      </div>
      <Container>
        <Button>button</Button>
        <Button primary>primary button</Button>
      </Container>
    </div>
  );
}

export default UndoRedo;
