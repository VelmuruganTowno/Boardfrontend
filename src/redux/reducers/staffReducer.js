import { ActionTypes } from "../actions/actionTypes";

var CryptoJS = require("crypto-js");

function decryptthepassword(ciphertext){
  let decryptedData = ciphertext;
  if(ciphertext.length>16){
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return decryptedData;
}

export const StaffListReducer = (
  state = {
    staffLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFF_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STAFF_LIST_SUCCESS:
      return { ...state, loading: false, staffLists: action.payload };
    default:
      return state;
  }
};

export const StaffDetailReducer = (
  state = { staffDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFF_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STAFF_DETAIL_SUCCESS:
      action.payload.password=decryptthepassword(action.payload.password);
      return { ...state, loading: false, staffDetail: action.payload };
    case ActionTypes.STAFF_CLEAR:
      return {
        ...state,
        staffDetail: {},
      };
    default:
      return state;
  }
};

