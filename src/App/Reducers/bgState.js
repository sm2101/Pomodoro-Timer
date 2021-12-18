import {
  SET_ALL_BG_DATA,
  SET_CURRENT_BG,
  SET_AUDIO,
  TOGGLE_AUDIO,
} from "../Constants";
const initialState = {
  bg: null,
  audio: null,
  name: null,
  allData: null,
  playAudio: false,
  audioVolume: 0.5,
};
const bgReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_BG:
      return {
        ...state,
        ...payload,
      };
    case SET_ALL_BG_DATA:
      return { ...state, ...payload };
    case SET_AUDIO:
      return { ...state, audioVolume: payload };
    case TOGGLE_AUDIO:
      return { ...state, playAudio: !state.playAudio };
    default:
      return state;
  }
};

export default bgReducer;
