import { ActionTypes } from "../actions/actionTypes";

export const DropDownListReducer = (
  state = {
    dropDownLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DROPDOWN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DROPDOWN_LIST_SUCCESS:
      return { ...state, loading: false, dropDownLists: action.payload };
    default:
      return state;
  }
};

export const DropDownDetailReducer = (
  state = { dropDownDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.DROPDOWN_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DROPDOWN_DETAIL_SUCCESS:
      return { ...state, loading: false, dropDownDetail: action.payload };
    case ActionTypes.DROPDOWN_CLEAR:
      return {
        ...state,
        dropDownDetail: {},
      };
    default:
      return state;
  }
};
