import Api from "../../Service/Api";
import { ActionTypes } from "./actionTypes";

export const airConditioningInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.AIRCONDITIONING_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Air Conditioning",
  }).then((res) => {
    dispatch({
      type: ActionTypes.AIRCONDITIONING_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const kitchenInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.KITCHEN_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Kitchen & Kitchenette",
  }).then((res) => {
    dispatch({
      type: ActionTypes.KITCHEN_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const roomServiceInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.ROOMSERVICE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Room service",
  }).then((res) => {
    dispatch({
      type: ActionTypes.ROOMSERVICE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const smokeDetectorInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SMOKEDETECTOR_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Smoke detector",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SMOKEDETECTOR_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const swimmingPoolInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SWIMMINGPOOL_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Swimming Pool",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SWIMMINGPOOL_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const laundryInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.LAUNDRY_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Laundry Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.LAUNDRY_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const ParkingInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.PARKING_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Parking Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.PARKING_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const interComInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.INTERCOM_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "InterCom Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.INTERCOM_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const childcareServiceInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.CHILDCARESERVICE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Childcare service",
  }).then((res) => {
    dispatch({
      type: ActionTypes.CHILDCARESERVICE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const speciallyInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SPECIALLYABLE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Specially abled assistance",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SPECIALLYABLE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  butlerInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.BUTLER_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Butler Services",
  }).then((res) => {
    dispatch({
      type: ActionTypes.BUTLER_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  sightSeeingInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SIGHTSEEING_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Sight Seeing",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SIGHTSEEING_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  fireplaceInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.FIREPLACE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Fireplace",
  }).then((res) => {
    dispatch({
      type: ActionTypes.FIREPLACE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  loungesInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.LOUNGES_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Lounge",
  }).then((res) => {
    dispatch({
      type: ActionTypes.LOUNGES_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  jacuzziInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.JACUZZI_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Jacuzzi",
  }).then((res) => {
    dispatch({
      type: ActionTypes.JACUZZI_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  shoppingInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SHOPPING_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Shopping",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SHOPPING_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  childrensplayareaInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.CHILDRENPLAYAREA_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Childrens play area",
  }).then((res) => {
    dispatch({
      type: ActionTypes.CHILDRENPLAYAREA_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const conferenceareaInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.CONFERENCEAREA_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Conference Area",
  }).then((res) => {
    dispatch({
      type: ActionTypes.CONFERENCEAREA_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  templeInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.TEMPLECHAPELPRAYERROOM_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Temple Chapel Prayerroom",
  }).then((res) => {
    dispatch({
      type: ActionTypes.TEMPLECHAPELPRAYERROOM_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  outdoorFurnitureInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.OUTDOORFURNITURE_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "OutDoorFurniture",
  }).then((res) => {
    dispatch({
      type: ActionTypes.OUTDOORFURNITURE_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  restaurantInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.RESTAURANT_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Restaurant",
  }).then((res) => {
    dispatch({
      type: ActionTypes.RESTAURANT_LIST_SUCCESS,
      payload: res.data,
    });
  });
};

export const  spaInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SPA_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "SPA Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SPA_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  salonInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SALON_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Salon",
  }).then((res) => {
    dispatch({
      type: ActionTypes.SALON_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  steamInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.STEAMSAUNA_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Steam Sauna Type",
  }).then((res) => {
    dispatch({
      type: ActionTypes.STEAMSAUNA_LIST_SUCCESS,
      payload: res.data,
    });
  });
};
export const  gymInitial = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.GYM_LIST_REQUEST,
  });
  await Api.post("productdropdownonly", {
    type: "Gym & Fitness centre",
  }).then((res) => {
    dispatch({
      type: ActionTypes.GYM_LIST_SUCCESS,
      payload: res.data,
    });
  });
};