import { ActionTypes } from "../actions/actionTypes";

export const ClientListReducer = (
  state = {
    clientLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CLIENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CLIENT_LIST_SUCCESS:
      return { ...state, loading: false, clientLists: action.payload };
    default:
      return state;
  }
};

export const ClientDetailReducer = (
  state = { clientDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.CLIENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CLIENT_DETAIL_SUCCESS:
      return { ...state, loading: false, clientDetail: action.payload };
    case ActionTypes.CLIENT_CLEAR:
      return {
        ...state,
        clientDetail: {},
      };
    default:
      return state;
  }
};
