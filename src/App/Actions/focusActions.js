import { TOGGLE_FOCUS } from "../Constants";
export const toggleFocus = (disaptch) => {
  disaptch({
    type: TOGGLE_FOCUS,
  });
};
