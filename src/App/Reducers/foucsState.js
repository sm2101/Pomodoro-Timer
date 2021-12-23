import { TOGGLE_FOCUS } from "../Constants";
const focusReducer = (state = false, { type }) => {
  switch (type) {
    case TOGGLE_FOCUS:
      return !state;
    default:
      return state;
  }
};

export default focusReducer;
