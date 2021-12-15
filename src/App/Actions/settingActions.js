import { TOGGLE_SETTING } from "../Constants";
export const toggleSetting = (disaptch) => {
  disaptch({
    type: TOGGLE_SETTING,
  });
};
