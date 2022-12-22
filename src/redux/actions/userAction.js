import axios from "axios";
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/designationConstans";


export const userlist = () => async (dispatch) => {
  dispatch({
    type:USER_LIST_REQUEST
  });
 
  try{
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(data);
    dispatch({
      type:USER_LIST_SUCCESS,
      payload:data,
    })
  } catch(error){
    dispatch({
      type:USER_LIST_FAIL,
      payload:error
    })
  }
}