import { ADD_TASK, REMOVE_TASK, SET_TASKS } from "../Constants";
const initialState = {};
const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return { ...state, activeTasks: [...state.activeTasks, ...payload] };
    case REMOVE_TASK:
      return { ...state, activeTasks: [...payload] };
    case SET_TASKS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default todoReducer;
