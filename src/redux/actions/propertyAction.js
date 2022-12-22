import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";
import { toast } from "react-toastify";



export const propertyListInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTY_LIST_REQUEST,
  });
  await Api.get("propertybasicpropertydetailsall/").then((res) => {
    dispatch({ type: ActionTypes.PROPERTY_LIST_SUCCESS, payload: res.data });
  });
};

export const propertyBasicData = (propertyId) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTYBASIC_LIST_REQUEST,
  });
  await Api.post("propertybasicpropertydetailsvalue/", {
    propertyId: propertyId,
  }).then((res) => {
    dispatch({
      type: ActionTypes.PROPERTYBASIC_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const propertyDetialCreate = (createData, onTab) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTYBASIC_CREATE_REQUEST,
    payload: createData,
  });
  await Api.post("propertybasicpropertydetails", createData).then((res) => {
    dispatch({
      type: ActionTypes.PROPERTYBASIC_CREATE_SUCCESS,
      payload: res.data,
    });
    sessionStorage.setItem("propertyId", res.data);
    toast.success("Successfully Created");
    onTab(2);
  });
};

export const propertyDetialUpdate = (updateData, onTab) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTYBASIC_UPDATE_REQUEST,
    payload: updateData,
  });
  await Api.put("propertybasicpropertydetailsupdate", updateData).then(
    (res) => {
      dispatch({
        type: ActionTypes.PROPERTYBASIC_UPDATE_SUCCESS,
        payload: res.data,
      });
      toast.success("Update SuccessFully");
      onTab(2);
    }
  );
};

export const propertyContactData = (propertyId) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTYCONTACT_LIST_REQUEST,
  });
  await Api.post("propertybasiccontactvalue/", {
    propertyId: propertyId,
  }).then((res) => {
    dispatch({
      type: ActionTypes.PROPERTYCONTACT_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const propertyContactCreate =
  (createData, history) => async (dispatch) => {
    dispatch({
      type: ActionTypes.PROPERTYCONTACT_CREATE_REQUEST,
      payload: createData,
    });
    await Api.post("propertybasiccontact", createData).then((res) => {
      dispatch({
        type: ActionTypes.PROPERTYCONTACT_CREATE_SUCCESS,
        payload: res.data,
      });
      history.push("/addproperty/amenities");
      toast.success("Successfully Created");
    });
  };

export const propertyContactUpdate =
  (updateData, history) => async (dispatch) => {
    dispatch({
      type: ActionTypes.PROPERTYCONTACT_UPDATE_REQUEST,
      payload: updateData,
    });
    await Api.put("propertybasiccontactupdate", updateData).then((res) => {
      dispatch({
        type: ActionTypes.PROPERTYCONTACT_UPDATE_SUCCESS,
        payload: res.data,
      });
      history.push("/addproperty/amenities");
      toast.success("Update SuccessFully");
    });
  };

  export const propertyBankData = (propertyId) => async (dispatch) => {
    dispatch({
      type: ActionTypes.PROPERTYBANK_LIST_REQUEST,
    });
    await Api.post("propertyamenitiesbankdetailsvalue", {
      propertyId: propertyId,
    }).then((res) => {
      dispatch({
        type: ActionTypes.PROPERTYBANK_LIST_SUCCESS,
        payload: res.data,
      });
    });
  };
  
  export const propertyBankCreate =
    (createData, history) => async (dispatch) => {
      dispatch({
        type: ActionTypes.PROPERTYBANK_CREATE_REQUEST,
        payload: createData,
      });
      await Api.post("propertyamenitiesbankdetails", createData).then((res) => {
        dispatch({
          type: ActionTypes.PROPERTYBANK_CREATE_SUCCESS,
          payload: res.data,
        });
        history.push("/addproperty/room");
        toast.success("Successfully Created");
      });
    };
  
  export const propertyBankUpdate =
    (updateData, history) => async (dispatch) => {
      dispatch({
        type: ActionTypes.PROPERTYBANK_UPDATE_REQUEST,
        payload: updateData,
      });
      await Api.put("propertyamenitiesbankdetailsupdate", updateData).then((res) => {
        dispatch({
          type: ActionTypes.PROPERTYBANK_UPDATE_SUCCESS,
          payload: res.data,
        });
        history.push("/addproperty/room");
        toast.success("Update SuccessFully");
      });
    };

export const propertyTypeList = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.PROPERTYTYPE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly/", {
    type: "Property Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.PROPERTYTYPE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const currencyList = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.CURRENCY_LIST_REQUEST,
  });
  await Api.post("productdropdownonly/", {
    type: "Currency",
  }).then((res) => {
    dispatch({ type: ActionTypes.CURRENCY_LIST_SUCCESS, payload: res.data });
  });
};
export const vCCCurrencyList = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.VCCCURRENCY_LIST_REQUEST,
  });
  await Api.post("productdropdownonly/", {
    type: "VCC Currency",
  }).then((res) => {
    dispatch({ type: ActionTypes.VCCCURRENCY_LIST_SUCCESS, payload: res.data });
  });
};
export const timezoneList = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.TIMEZONE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly/", {
    type: "Timezone",
  }).then((res) => {
    dispatch({ type: ActionTypes.TIMEZONE_LIST_SUCCESS, payload: res.data });
  });
};
