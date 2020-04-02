import React, { useState, useReducer } from "react";

import "./undoRedo.css";

const reducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "add":
      return {
        text: [...state.text, action.payload],
        history: [...state.history, state],
        value: action.payload
      };
    case "undo":
      const isEmpty = !state.history.length;
      if (isEmpty) return { value: "" };
      return {
        ...state,
        value: state.history[state.history.length - 1].text.pop()
      };
    case "redo":
      return {
        ...state,
        value: state.text[state.text.length - 1]
      };
    default:
      console.error("Err");
  }
};

const initialState = {
  text: [],
  history: [],
  value: []
};

function UndoRedo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="main">
      <input
        type="text"
        value={state.value}
        onChange={() => dispatch({ type: "add", payload: event.target.value })}
      />
      <div className="button_wrap">
        <button onClick={() => dispatch({ type: "undo" })}>Undo</button>
        <button onClick={() => dispatch({ type: "redo" })}>Redo</button>
      </div>
    </div>
  );
}

export default UndoRedo;
