import { ActionTypes } from "../constants/propertyListType";

const intialState = {
  propertys: []
};

export const propertyListReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ALLPROPERTY:
      return { ...state, propertys: payload };
    default:
      return state;
  }
};

export const propertyIdReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PROPERTYID:
      return { ...state, propertyid: payload };
    default:
      return state;
  }
};


