import { TOGGLE_DRAWER } from "../Constants";

export const toggleDrawer = (dispatch) => {
  dispatch({
    type: TOGGLE_DRAWER,
  });
};
