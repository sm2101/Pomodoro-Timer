import { combineReducers } from "redux";
import counterReducer from "./CounterState";
import settingReducer from "./SettingState";
import refreshReducer from "./RefreshState";
import userReducer from "./userState";
import bgReducer from "./bgState";
const rootReducer = combineReducers({
  counterState: counterReducer,
  settingState: settingReducer,
  refreshState: refreshReducer,
  userState: userReducer,
  bgState: bgReducer,
});

export default rootReducer;
