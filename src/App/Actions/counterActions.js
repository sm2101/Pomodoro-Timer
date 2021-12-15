import {
  CHANGE_CURRENT,
  CHANGE_SESSION,
  START,
  PAUSE,
  RESET,
  EDIT_COUNTER,
} from "../Constants";

export const startCounter = (dispatch) => {
  dispatch({
    type: START,
  });
};
export const pauseCounter = (dispatch) => {
  dispatch({
    type: PAUSE,
  });
};
export const resetCounter = (dispatch) => {
  dispatch({
    type: RESET,
  });
};
export const changeCurrent = (dispatch, newTab) => {
  dispatch({
    type: CHANGE_CURRENT,
    payload: { newTab },
  });
};
export const changeSession = (dispatch) => {
  dispatch({
    type: CHANGE_SESSION,
  });
};
export const editCounter = (dispatch, data) => {
  dispatch({
    type: EDIT_COUNTER,
    payload: { ...data },
  });
};
