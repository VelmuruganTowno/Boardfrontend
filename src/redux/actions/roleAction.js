import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const roleListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.ROLE_LIST_REQUEST,
  });
  await Api.get("roleall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.ROLE_LIST_SUCCESS, payload: res.data });
  });
};

export const roledetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.ROLE_DETAIL_REQUEST, payload: id });
  await Api.get(`role/${id}`).then((res) => {
    if (res.data.roleCreate === null) {
      res.data.roleCreate = false;
    }
    if (res.data.roleDelete === null) {
      res.data.roleDelete = false;
    }
    if (res.data.roleUpdate === null) {
      res.data.roleUpdate = false;
    }
    dispatch({ type: ActionTypes.ROLE_DETAIL_SUCCESS, payload: res.data });
  });
};

export const roleCreateInitial = (createData, uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.ROLE_CREATE_REQUEST, payload: createData });
  await Api.post("role", createData).then((res) => {
    dispatch({ type: ActionTypes.ROLE_CREATE_SUCCESS, payload: res.data });
    dispatch(roleListInitial(uniqueid));
    dispatch(roleclearFormInitial());
    toast.success("Successfully Created");
  });
};

export const roleUpdateInitial = (updateData, uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.ROLE_UPDATE_REQUEST, payload: updateData });
  await Api.put(`role/${updateData.id}`, updateData).then((res) => {
    dispatch({ type: ActionTypes.ROLE_UPDATE_SUCCESS, payload: res.data });
    dispatch(roleListInitial(uniqueid));
    toast.success("Update SuccessFully");
    dispatch(roleclearFormInitial());
  });
};

export const roleclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.ROLE_CLEAR });
};
