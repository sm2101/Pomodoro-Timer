import { LOGIN, LOGOUT } from "../Constants";
export const login = (disaptch, payload) => {
  disaptch({
    type: LOGIN,
    payload,
  });
};
export const logout = (disaptch) => {
  disaptch({
    type: LOGOUT,
  });
};
