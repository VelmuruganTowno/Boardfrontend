import { ActionTypes } from "../actions/actionTypes";

export const propertyListReducer = (
  state = {
    propertyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PROPERTY_LIST_SUCCESS:
      return { ...state, loading: false, propertyLists: action.payload };
    default:
      return state;
  }
};

export const propertyBasicDataReducer = (
  state = {
    propertyBasicDatas:"",
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTYBASIC_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PROPERTYBASIC_LIST_SUCCESS:
      return { ...state, loading: false, propertyBasicDatas: action.payload };
    default:
      return state;
  }
};

export const propertyContactDataReducer = (
  state = {
    propertyContactDatas:"",
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTYCONTACT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PROPERTYCONTACT_LIST_SUCCESS:
      return { ...state, loading: false, propertyContactDatas: action.payload };
    default:
      return state;
  }
};
export const propertyBankDataReducer = (
  state = {
    propertyBankDatas:"",
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTYBANK_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PROPERTYBANK_LIST_SUCCESS:
      return { ...state, loading: false, propertyBankDatas: action.payload };
    default:
      return state;
  }
};
export const propertyTypeListReducer = (
  state = {
    propertyTypeLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTYTYPE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PROPERTYTYPE_LIST_SUCCESS:
      return { ...state, loading: false, propertyTypeLists: action.payload };
    default:
      return state;
  }
};
export const currencyListReducer = (
  state = {
    currencyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CURRENCY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CURRENCY_LIST_SUCCESS:
      return { ...state, loading: false, currencyLists: action.payload };
    default:
      return state;
  }
};

export const vccCurrencyListReducer = (
  state = {
    vccCurrencyLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VCCCURRENCY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.VCCCURRENCY_LIST_SUCCESS:
      return { ...state, loading: false, vccCurrencyLists: action.payload };
    default:
      return state;
  }
};

export const timeZoneListReducer = (
  state = {
    timeZoneLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TIMEZONE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.TIMEZONE_LIST_SUCCESS:
      return { ...state, loading: false, timeZoneLists: action.payload };
    default:
      return state;
  }
};