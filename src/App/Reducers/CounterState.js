import {
  CHANGE_CURRENT,
  CHANGE_SESSION,
  START,
  PAUSE,
  RESET,
  EDIT_COUNTER,
} from "../Constants";
const userStr = localStorage.getItem("user") || "";
const sessionStr = localStorage.getItem("session") || "";
const user = JSON.parse(userStr || "{}");
const session = JSON.parse(sessionStr || "{}");
const initialState = {
  isActive: false,
  focus: session?.focus || user?.preset1?.focus || 25,
  short: session?.short || user?.preset1?.short || 5,
  long: session?.long || user?.preset1?.long || 15,
  current: "focus",
  longDuration: session?.break || user?.preset1?.break || 4,
  session: 0,
  auto: session?.auto || user?.preset1?.auto || true,
  strict: session?.strict || false,
  maxSession: session?.maxSession || 4,
  totalSessions: 0,
  notification: Notification.permission === "granted" ? true : false,
};

const counterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START:
      return { ...state, isActive: true };
    case PAUSE:
      return { ...state, isActive: false };
    case RESET:
      return {
        ...state,
        isActive: false,
        session: 0,
        current: "focus",
        totalSessions: 0,
      };
    case CHANGE_CURRENT:
      return { ...state, current: payload.newTab };
    case CHANGE_SESSION:
      let newSession =
        state.session < state.longDuration ? state.session + 1 : 0;
      return { ...state, session: newSession };
    case EDIT_COUNTER:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default counterReducer;
