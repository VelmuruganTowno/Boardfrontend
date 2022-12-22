import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";



export const agentRoleListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.AGENTROLE_LIST_REQUEST,
  });
  await Api.get("agentroleall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.AGENTROLE_LIST_SUCCESS, payload: res.data });
  });
};

export const agentRoledetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.AGENTROLE_DETAIL_REQUEST, payload: id });
  await Api.get(`agentrole/${id}`).then((res) => {
    dispatch({ type: ActionTypes.AGENTROLE_DETAIL_SUCCESS, payload: res.data });
  });
};

export const agentRoleCreateInitial = (createData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.AGENTROLE_CREATE_REQUEST, payload: createData });
  await Api.post("agentrole", createData).then((res) => {
    dispatch({ type: ActionTypes.AGENTROLE_CREATE_SUCCESS, payload: res.data });
    dispatch(agentRoleListInitial(uniqueid));
    dispatch(agentRoleclearFormInitial());
    toast.success("Successfully Created");
  });
};

export const agentRoleUpdateInitial = (updateData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.AGENTROLE_UPDATE_REQUEST, payload: updateData });
  await Api.put(`agentrole/${updateData.id}`, updateData).then((res) => {
    dispatch({ type: ActionTypes.AGENTROLE_UPDATE_SUCCESS, payload: res.data });
    dispatch(agentRoleListInitial(uniqueid));
    toast.success("Update SuccessFully");
    dispatch(agentRoleclearFormInitial());
  });
};

export const agentRoleclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.AGENTROLE_CLEAR });
};
