import { SET_ALL_BG_DATA, SET_CURRENT_BG } from "../Constants";

export const setCurrent = (dispatch, bg, audio, name) => {
  dispatch({
    type: SET_CURRENT_BG,
    payload: {
      bg,
      audio,
      name,
    },
  });
};

export const setAll = (dispatch, data) => {
  dispatch({
    type: SET_ALL_BG_DATA,
    payload: {
      bg: data[0].bg,
      audio: data[0].audio,
      name: data[0].name,
      allData: data,
    },
  });
};
