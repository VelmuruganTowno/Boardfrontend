import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";

export const bookingDetialInitial = (id, uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.BOOKINGDETIAL_LIST_REQUEST,
  });
  await Api.get(`bookingdetails/${uniqueid}/${id}`).then((res) => {
    dispatch({
      type: ActionTypes.BOOKINGDETIAL_LIST_SUCCESS,
      payload: res.data,
    });
  });
};


export const historyListInitial = (uniqueid, id) => async (dispatch) => {
  dispatch({
    type: ActionTypes.HISTROY_LIST_REQUEST,
  });
  await Api.get(`bookinghistory/${uniqueid}/${id}`).then((res) => {
    dispatch({
      type: ActionTypes.HISTROY_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
