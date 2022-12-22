import { ActionTypes } from "../actions/actionTypes";

const initalState = {
  user: null,
  loading: false,
  error: null,
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
