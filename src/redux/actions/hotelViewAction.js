import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";


export const hotelDetailsInitial = (value) => async (dispatch) => {
  dispatch({
    type: ActionTypes.HOTELDETAIL_LIST_REQUEST,
  });
  await Api.post("propertybasicpropertydetailsvalue",value).then((res) => {
    dispatch({
      type: ActionTypes.HOTELDETAIL_LIST_SUCCESS,
      payload: res.data,
    });
  });
};