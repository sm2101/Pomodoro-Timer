import { combineReducers } from "redux";
import counterReducer from "./CounterState";
import settingReducer from "./SettingState";
import refreshReducer from "./RefreshState";
import userReducer from "./userState";
import bgReducer from "./bgState";
import todoReducer from "./todoState";
import notepadReducer from "./notepadState";
import focusReducer from "./foucsState";
const rootReducer = combineReducers({
  counterState: counterReducer,
  settingState: settingReducer,
  refreshState: refreshReducer,
  userState: userReducer,
  bgState: bgReducer,
  todoState: todoReducer,
  notepadState: notepadReducer,
  focusState: focusReducer,
});

export default rootReducer;
