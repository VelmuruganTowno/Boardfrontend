import { ActionTypes } from "../constants/propertyListType";

export const getPropertys = (propertys) => {
  return {
    type: ActionTypes.GET_ALLPROPERTY,
    payload: propertys
  };
};

export const getid = (propertyid) => {
  return {
    type: ActionTypes.GET_PROPERTYID,
    payload: propertyid
  };
};
