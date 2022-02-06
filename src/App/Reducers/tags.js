import { GET_TAGS, ADD_TAG } from "../Constants";
const initialState = [];
const tagsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TAGS:
      return [...payload];
    case ADD_TAG:
      return [...state, payload];
    default:
      return state;
  }
};

export default tagsReducer;
