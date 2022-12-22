import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";



export const designationOnlyInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.DESIGNATIONONLY_LIST_REQUEST,
  });
  await Api.get("designationonly/" + uniqueid).then((res) => {
    dispatch({
      type: ActionTypes.DESIGNATIONONLY_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const roleOnlyInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.ROLEONLY_LIST_REQUEST,
  });
  await Api.get("roleonly/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.ROLEONLY_LIST_SUCCESS, payload: res.data });
  });
};

export const branchOnlyInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.BRANCHONLY_LIST_REQUEST,
  });
  await Api.get("branchonly/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.BRANCHONLY_LIST_SUCCESS, payload: res.data });
  });
};



