import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";

export const dropDownListInitial = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.DROPDOWN_LIST_REQUEST,
  });
  await Api.post("productdropdown", data).then((res) => {
    dispatch({ type: ActionTypes.DROPDOWN_LIST_SUCCESS, payload: res.data });
  });
};

export const dropDowndetailsInitial = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.DROPDOWN_DETAIL_REQUEST, payload: id });
  await Api.get(`productdropdown/${id}`).then((res) => {
    dispatch({ type: ActionTypes.DROPDOWN_DETAIL_SUCCESS, payload: res.data });
  });
};

export const dropDownCreateInitial =
  (createData, DropData) => async (dispatch) => {
    dispatch({
      type: ActionTypes.DROPDOWN_CREATE_REQUEST,
      payload: createData,
    });
    await Api.post("productdropdowncreate", createData).then((res) => {
      dispatch({
        type: ActionTypes.DROPDOWN_CREATE_SUCCESS,
        payload: res.data,
      });
      dispatch(dropDownListInitial(DropData));
      dispatch(dropDownclearFormInitial());
      toast.success("Successfully Created");
    });
  };

export const dropDownUpdateInitial =
  (updateData, DropData) => async (dispatch) => {
    dispatch({
      type: ActionTypes.DROPDOWN_UPDATE_REQUEST,
      payload: updateData,
    });
    await Api.put(`productdropdown/${updateData.id}`, updateData).then(
      (res) => {
        dispatch({
          type: ActionTypes.DROPDOWN_UPDATE_SUCCESS,
          payload: res.data,
        });
        dispatch(dropDownListInitial(DropData));
        toast.success("Update SuccessFully");
        dispatch(dropDownclearFormInitial());
      }
    );
  };

export const dropDownclearFormInitial = () => (dispatch) => {
  dispatch({ type: ActionTypes.DROPDOWN_CLEAR });
};
