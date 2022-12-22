import { ActionTypes } from "../actions/actionTypes";

export const BranchListReducer = (
  state = {
    branchLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BRANCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BRANCH_LIST_SUCCESS:
      return { ...state, loading: false, branchLists: action.payload };
    default:
      return state;
  }
};

export const BranchDetailReducer = (
  state = { branchDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.BRANCH_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BRANCH_DETAIL_SUCCESS:
      return { ...state, loading: false, branchDetail: action.payload };
    case ActionTypes.BRANCH_CLEAR:
      return {
        ...state,
        branchDetail: {},
      };
    default:
      return state;
  }
};




