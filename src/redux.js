import { createStore } from "redux";


const store = createStore(addNewTask);
const currentState = store.getState();
const state = "";
const NEW_TASK = "NEW_TASK";

const actionCreator = (task) => {
  return {
    type: NEW_TASK,
    payload: task,
  };
};

store.subscribe(() => {
  console.log("создалась задача");
});

store.dispatch(actionCreator());

const addNewTask = (state = {}, action) => {
  switch (action.type) {
    case NEW_TASK:
      return { ...state, type: action.type };
    default:
      return state;
  }
};
