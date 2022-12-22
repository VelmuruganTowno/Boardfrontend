import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";



export const designationListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.DESIGNATION_LIST_REQUEST,
  });
  await Api.get("designationall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.DESIGNATION_LIST_SUCCESS, payload: res.data });
  });
};

export const designationdetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.DESIGNATION_DETAIL_REQUEST, payload: id });
  await Api.get(`designation/${id}`).then((res) => {
    dispatch({ type: ActionTypes.DESIGNATION_DETAIL_SUCCESS, payload: res.data });
  });
};

export const designationCreateInitial = (createData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.DESIGNATION_CREATE_REQUEST, payload: createData });
  await Api.post("designation", createData).then((res) => {
    dispatch({ type: ActionTypes.DESIGNATION_CREATE_SUCCESS, payload: res.data });
    dispatch(designationListInitial(uniqueid));
    dispatch(designationclearFormInitial());
    toast.success("Successfully Created");
  });
};

export const designationUpdateInitial = (updateData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.DESIGNATION_UPDATE_REQUEST, payload: updateData });
  await Api.put(`designation/${updateData.id}`, updateData).then((res) => {
    dispatch({ type: ActionTypes.DESIGNATION_UPDATE_SUCCESS, payload: res.data });
    dispatch(designationListInitial(uniqueid));
    toast.success("Update SuccessFully");
    dispatch(designationclearFormInitial());
  });
};

export const designationclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.DESIGNATION_CLEAR });
};
