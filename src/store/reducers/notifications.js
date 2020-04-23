import * as actionTypes from "../actions/actionTypes";

const initialState = {
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case actionTypes.FILTER_NOTIFICATIONS:
      const filteredData = state.notifications.filter((msg) => msg.id !== action.id);
      return {
        ...state,
        notifications: filteredData,
      };
    default:
      return state;
  }
};

export default reducer;
