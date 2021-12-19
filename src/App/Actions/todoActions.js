import { ADD_TASK, REMOVE_TASK, SET_TASKS } from "../Constants";

export const addTask = (dispatch, data) => {
  dispatch({
    type: ADD_TASK,
    payload: [data],
  });
};
export const setTasks = (dispatch, data) => {
  dispatch({
    type: SET_TASKS,
    payload: data,
  });
};
export const removeTask = (dispatch, data) => {
  dispatch({
    type: REMOVE_TASK,
    payload: [...data],
  });
};
