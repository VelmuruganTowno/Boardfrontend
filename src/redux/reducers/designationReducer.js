import { ActionTypes } from "../actions/actionTypes";

export const DesinationListReducer = (
  state = {
    designationLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DESIGNATION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DESIGNATION_LIST_SUCCESS:
      return { ...state, loading: false, designationLists: action.payload };
    default:
      return state;
  }
};

export const DesinationDetailReducer = (
  state = { designationDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.DESIGNATION_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DESIGNATION_DETAIL_SUCCESS:
      return { ...state, loading: false, designationDetail: action.payload };
    case ActionTypes.DESIGNATION_CLEAR:
      return {
        ...state,
        designationDetail: {},
      };
    default:
      return state;
  }
};
