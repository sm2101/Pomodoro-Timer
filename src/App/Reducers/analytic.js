import { SET_ANALYTIC_DATA } from "../Constants";
const initialState = {};
const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ANALYTIC_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
