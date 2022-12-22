import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";

export const roomPaymentInitial = (uniqueId, id) => async (dispatch) => {
  dispatch({
    type: ActionTypes.ROOMPAYMENT_LIST_REQUEST,
  });
  await Api.get(`roompayment/${uniqueId}/${id}`).then((res) => {
    dispatch({
      type: ActionTypes.ROOMPAYMENT_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
