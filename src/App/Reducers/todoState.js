import { ADD_TASK, REMOVE_TASK, SET_TASKS } from "../Constants";
const initialState = [];
const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return [...payload, ...state];
    case REMOVE_TASK:
      return [...payload];
    case SET_TASKS:
      return [...payload];
    default:
      return state;
  }
};

export default todoReducer;
