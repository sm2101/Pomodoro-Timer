import { SET_ANALYTIC_DATA } from "../Constants";

export const setAnalyticData = (dispatch, data) => {
  dispatch({
    type: SET_ANALYTIC_DATA,
    payload: {
      ...data,
    },
  });
};
