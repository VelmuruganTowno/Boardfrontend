import { ActionTypes } from "../actions/actionTypes";

export const RoleListReducer = (
  state = {
    roleLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ROLE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ROLE_LIST_SUCCESS:
      return { ...state, loading: false, roleLists: action.payload };
    default:
      return state;
  }
};

export const RoleDetailReducer = (
  state = { roleDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.ROLE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ROLE_DETAIL_SUCCESS:
      return { ...state, loading: false, roleDetail: action.payload };
    case ActionTypes.ROLE_CLEAR:
      return {
        ...state,
        roleDetail: {},
      };
    default:
      return state;
  }
};
