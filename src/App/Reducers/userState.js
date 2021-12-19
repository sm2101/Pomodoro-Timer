import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { LOGIN, LOGOUT } from "../Constants";
const initialState = {
  isAuthenticated: Cookies.get("jwt") ? true : false,
  user: Cookies.get("jwt") ? jwt.decode(Cookies.get("jwt")) : null,
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
