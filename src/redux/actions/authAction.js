import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";


export const loginInitial = (loginvalues, history) => async (dispatch) => {
  dispatch({ type: ActionTypes.USER_LOGIN_REQUEST, payload: loginvalues });
  try {
    const { data } = await Api.post("login", loginvalues);
    if (data.id !== null) {
      dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("unique_id", data.uniqueId);
      localStorage.setItem("employee_id", data.id);
      localStorage.setItem("auth", loginvalues.username);
      localStorage.setItem("role", data.role);
      history.push("/bookinglist");
    } else {
      toast.error("Invalid Password or UserName");
    }
  } catch (error) {
    toast.error("Some Internal Error");
  }
};

export const logoutInitial = () => (dispatch) => {
  localStorage.clear();
  sessionStorage.clear();
  dispatch({ type: ActionTypes.USER_LOGOUT });
};
