import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const agentListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.AGENT_LIST_REQUEST,
  });
  await Api.get(`companyregisteration/`+ uniqueid).then((res) => {
    dispatch({ type: ActionTypes.AGENT_LIST_SUCCESS, payload: res.data });
  });
};

export const agentdetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.AGENT_DETAIL_REQUEST, payload: id });
  await Api.get(`companyregisteration/${id}`).then((res) => {
    res.data.dob = new Date(res.data.dob);
    dispatch({ type: ActionTypes.AGENT_DETAIL_SUCCESS, payload: res.data });
  });
};

export const agentCreateInitial =
  (createData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.AGENT_CREATE_REQUEST, payload: createData });
    await Api.post("agent", createData).then((res) => {
      dispatch({ type: ActionTypes.AGENT_CREATE_SUCCESS, payload: res.data });
      toast.success("Successfully Created");
      dispatch(agentListInitial(uniqueid));
      dispatch(agentclearFormInitial());
    });
  };

export const agentUpdateInitial =
  (updateData, uniqueid) => async (dispatch) => {
    dispatch({ type: ActionTypes.AGENT_UPDATE_REQUEST, payload: updateData });
    await Api.put(`agent/${updateData.id}`, updateData).then((res) => {
      dispatch({ type: ActionTypes.AGENT_UPDATE_SUCCESS, payload: res.data });
      toast.success("Update SuccessFully");
      dispatch(agentListInitial(uniqueid));
      dispatch(agentclearFormInitial());
    });
  };

export const agentclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.AGENT_CLEAR });
};
