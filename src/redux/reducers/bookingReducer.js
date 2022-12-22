import { ActionTypes } from "../actions/actionTypes";

export const BookingDetialListReducer = (
  state = {
    bookingDetail: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BOOKINGDETIAL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BOOKINGDETIAL_LIST_SUCCESS:
      return { ...state, loading: false, bookingDetail: action.payload };
    default:
      return state;
  }
};

export const HistoryListReducer = (
  state = {
    historyLists: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.HISTROY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.HISTROY_LIST_SUCCESS:
      return { ...state, historyLists: action.payload };
    default:
      return state;
  }
};