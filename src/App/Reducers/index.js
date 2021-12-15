import { combineReducers } from "redux";
import counterReducer from "./CounterState";
import settingReducer from "./SettingState";
import refreshReducer from "./RefreshState";
const rootReducer = combineReducers({
  counterState: counterReducer,
  settingState: settingReducer,
  refreshState: refreshReducer,
});

export default rootReducer;
