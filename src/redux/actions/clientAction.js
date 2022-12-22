import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const clientListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.CLIENT_LIST_REQUEST,
  });
  await Api.get("clientall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.CLIENT_LIST_SUCCESS, payload: res.data });
  });
};

export const clientdetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.CLIENT_DETAIL_REQUEST, payload: id });
  await Api.get(`client/${id}`).then((res) => {
    res.data.dob = new Date(res.data.dob);
    dispatch({ type: ActionTypes.CLIENT_DETAIL_SUCCESS, payload: res.data });
  });
};

export const clientCreateInitial =
  (createData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.CLIENT_CREATE_REQUEST, payload: createData });
    await Api.post("client", createData).then((res) => {
      dispatch({ type: ActionTypes.CLIENT_CREATE_SUCCESS, payload: res.data });
      toast.success("Successfully Created");
      dispatch(clientListInitial(uniqueid));
      dispatch(clientclearFormInitial());
    });
  };

export const clientUpdateInitial =
  (updateData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.CLIENT_UPDATE_REQUEST, payload: updateData });
    await Api.put(`client/${updateData.id}`, updateData).then((res) => {
      dispatch({ type: ActionTypes.CLIENT_UPDATE_SUCCESS, payload: res.data });
      toast.success("Update SuccessFully");
      dispatch(clientListInitial(uniqueid));
      dispatch(clientclearFormInitial());
    });
  };

export const clientclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.CLIENT_CLEAR });
};
