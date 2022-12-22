import { ActionTypes } from "../actions/actionTypes";

export const RoleOnlyListReducer = (
  state = {
    roleOnlyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ROLEONLY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ROLEONLY_LIST_SUCCESS:
      return { ...state, loading: false, roleOnlyLists: action.payload };
    default:
      return state;
  }
};

export const BranchOnlyListReducer = (
  state = {
    branchOnlyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BRANCHONLY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BRANCHONLY_LIST_SUCCESS:
      return { ...state, loading: false, branchOnlyLists: action.payload };
    default:
      return state;
  }
};

export const DesignationOnlyListReducer = (
  state = {
    designationOnlyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DESIGNATIONONLY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DESIGNATIONONLY_LIST_SUCCESS:
      return { ...state, loading: false, designationOnlyLists: action.payload };
    default:
      return state;
  }
};
