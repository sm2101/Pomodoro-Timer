import { REFRESH } from "../Constants";
const refreshReducer = (state = false, { type, payload }) => {
  switch (type) {
    case REFRESH:
      return !state;
    default:
      return state;
  }
};

export default refreshReducer;
