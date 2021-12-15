import { TOGGLE_SETTING } from "../Constants";
const settingReducer = (state = false, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTING:
      return !state;
    default:
      return state;
  }
};

export default settingReducer;
