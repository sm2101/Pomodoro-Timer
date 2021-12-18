import { LOGIN, LOGOUT } from "../Constants";
const initialState = {
  isAuthenticated: window.localStorage.getItem("user") ? true : false,
  user: window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : null,
};
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        ...payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
