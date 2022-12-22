import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const staffListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.STAFF_LIST_REQUEST,
  });
  await Api.get("staff-detailsall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.STAFF_LIST_SUCCESS, payload: res.data });
  });
};

export const staffdetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.STAFF_DETAIL_REQUEST, payload: id });
  await Api.get(`staff-details/${id}`).then((res) => {
    res.data.dob = new Date(res.data.dob);
    dispatch({ type: ActionTypes.STAFF_DETAIL_SUCCESS, payload: res.data });
  });
};

export const staffCreateInitial =
  (createData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.STAFF_CREATE_REQUEST, payload: createData });
    await Api.post("staff-details", createData).then((res) => {
      dispatch({ type: ActionTypes.STAFF_CREATE_SUCCESS, payload: res.data });
      dispatch(staffListInitial(uniqueid));
      dispatch(staffclearFormInitial());
      toast.success("Successfully Created");
    });
  };

export const staffUpdateInitial =
  (updateData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.STAFF_UPDATE_REQUEST, payload: updateData });
    await Api.put(`staff-details/${updateData.id}`, updateData).then((res) => {
      dispatch({ type: ActionTypes.STAFF_UPDATE_SUCCESS, payload: res.data });
      dispatch(staffListInitial(uniqueid));
      toast.success("Update SuccessFully");
      dispatch(staffclearFormInitial());
    });
  };

export const staffclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.STAFF_CLEAR });
};
