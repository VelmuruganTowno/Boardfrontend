import { ActionTypes } from "../actions/actionTypes";

export const hotelDetailsListReducer = (
  state = {
    hotelDetails: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.HOTELDETAIL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.HOTELDETAIL_LIST_SUCCESS:
      return { ...state, loading: false, hotelDetails: action.payload };
    default:
      return state;
  }
};
