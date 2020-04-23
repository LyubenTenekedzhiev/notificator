import * as actionTypes from "./actionTypes";

export const setIngredients = (data) => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notifications: data,
  };
};

export const filterNotifications = (id) => {
  return {
    type: actionTypes.FILTER_NOTIFICATIONS,
    id: id,
  };
};
