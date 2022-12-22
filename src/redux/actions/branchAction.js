import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const branchListInitial = (uniqueid) => async (dispatch) => {
  dispatch({
    type: ActionTypes.BRANCH_LIST_REQUEST,
  });
  await Api.get("branchall/" + uniqueid).then((res) => {
    dispatch({ type: ActionTypes.BRANCH_LIST_SUCCESS, payload: res.data });
  });
};

export const branchdetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.BRANCH_DETAIL_REQUEST, payload: id });
  await Api.get(`branch/${id}`).then((res) => {
    dispatch({ type: ActionTypes.BRANCH_DETAIL_SUCCESS, payload: res.data });
  });
};

export const branchCreateInitial = (createData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.BRANCH_CREATE_REQUEST, payload: createData });
  await Api.post("branch", createData).then((res) => {
    dispatch({ type: ActionTypes.BRANCH_CREATE_SUCCESS, payload: res.data });
    dispatch(branchListInitial(uniqueid));
    dispatch(branchclearFormInitial());
    toast.success("Successfully Created");
  });
};

export const branchUpdateInitial = (updateData,uniqueid) => async (dispatch) => {
  dispatch({ type: ActionTypes.BRANCH_UPDATE_REQUEST, payload: updateData });
  await Api.put(`branch/${updateData.id}`, updateData).then((res) => {
    dispatch({ type: ActionTypes.BRANCH_UPDATE_SUCCESS, payload: res.data });
    dispatch(branchListInitial(uniqueid));
    toast.success("Update SuccessFully");
    dispatch(branchclearFormInitial());
  });
};

export const branchclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.BRANCH_CLEAR });
};
