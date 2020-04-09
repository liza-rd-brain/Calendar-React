import React, { useState, useReducer } from "react";

import "./undoRedo.css";

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
    </div>
  );
}

export default UndoRedo;
