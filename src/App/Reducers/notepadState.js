import { TOGGLE_DRAWER } from "../Constants";
const initialState = false;
const notepadReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_DRAWER:
      return !state;
    default:
      return state;
  }
};

export default notepadReducer;
