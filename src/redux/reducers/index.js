import { combineReducers } from "redux";
import { propertyListReducer, propertyIdReducer } from "./propertyListReducer";
const reducers = combineReducers({
  allPropertys: propertyListReducer,
  singleProperty: propertyIdReducer
});
export default reducers;
