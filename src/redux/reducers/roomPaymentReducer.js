import { ActionTypes } from "../actions/actionTypes";

export const roomPaymentListReducer = (
  state = {
    roomPayment: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ROOMPAYMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ROOMPAYMENT_LIST_SUCCESS:
      return { ...state, loading: false, roomPayment: action.payload };
    default:
      return state;
  }
};
