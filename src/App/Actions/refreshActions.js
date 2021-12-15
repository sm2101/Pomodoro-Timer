import { REFRESH } from "../Constants";
export const refresh = (disaptch) => {
  disaptch({
    type: REFRESH,
  });
};
