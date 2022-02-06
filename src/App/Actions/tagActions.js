import { GET_TAGS, ADD_TAG } from "../Constants";

export const getTags = (dispatch, data) => {
  dispatch({
    type: GET_TAGS,
    payload: [...data],
  });
};

export const addTag = (dispatch, data) => {
  dispatch({
    type: ADD_TAG,
    payload: data,
  });
};
