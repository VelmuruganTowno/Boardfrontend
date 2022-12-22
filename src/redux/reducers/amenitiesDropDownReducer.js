import { ActionTypes } from "../actions/actionTypes";

export const airConditionReducer = (
  state = {
    airConditionLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.AIRCONDITIONING_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AIRCONDITIONING_LIST_SUCCESS:
      return { ...state, loading: false, airConditionLists: action.payload };
    default:
      return state;
  }
};

export const kitchenReducer = (
  state = {
    kitchenLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.KITCHEN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.KITCHEN_LIST_SUCCESS:
      return { ...state, loading: false, kitchenLists: action.payload };
    default:
      return state;
  }
};
export const roomServiceReducer = (
  state = {
    roomServiceLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ROOMSERVICE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ROOMSERVICE_LIST_SUCCESS:
      return { ...state, loading: false, roomServiceLists: action.payload };
    default:
      return state;
  }
};
export const smokeDetectorReducer = (
  state = {
    smokeDetectorLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SMOKEDETECTOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SMOKEDETECTOR_LIST_SUCCESS:
      return { ...state, loading: false, smokeDetectorLists: action.payload };
    default:
      return state;
  }
};

export const swimmingpoolReducer = (
  state = {
    swimmingpoolLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SWIMMINGPOOL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SWIMMINGPOOL_LIST_SUCCESS:
      return { ...state, loading: false, swimmingpoolLists: action.payload };
    default:
      return state;
  }
};

export const laundryReducer = (
  state = {
    laundryLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.laundry_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LAUNDRY_LIST_SUCCESS:
      return { ...state, loading: false, laundryLists: action.payload };
    default:
      return state;
  }
};

export const parkingReducer = (
  state = {
    parkingLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PARKING_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PARKING_LIST_SUCCESS:
      return { ...state, loading: false, parkingLists: action.payload };
    default:
      return state;
  }
};

export const interComReducer = (
  state = {
    interComLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.INTERCOM_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.INTERCOM_LIST_SUCCESS:
      return { ...state, loading: false, interComLists: action.payload };
    default:
      return state;
  }
};

export const childCareServiceReducer = (
  state = {
    childCareServiceLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHILDCARESERVICE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CHILDCARESERVICE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        childCareServiceLists: action.payload,
      };
    default:
      return state;
  }
};

export const speciallyAbledReducer = (
  state = {
    speciallyAbledLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SPECIALLYABLE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SPECIALLYABLE_LIST_SUCCESS:
      return { ...state, loading: false, speciallyAbledLists: action.payload };
    default:
      return state;
  }
};

export const butlerReducer = (
  state = {
    butlerLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BUTLER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BUTLER_LIST_SUCCESS:
      return { ...state, loading: false, butlerLists: action.payload };
    default:
      return state;
  }
};

export const sightSeeingReducer = (
  state = {
    sightSeeingLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SIGHTSEEING_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SIGHTSEEING_LIST_SUCCESS:
      return { ...state, loading: false, sightSeeingLists: action.payload };
    default:
      return state;
  }
};

export const firePlaceReducer = (
  state = {
    firePlaceLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FIREPLACE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FIREPLACE_LIST_SUCCESS:
      return { ...state, loading: false, firePlaceLists: action.payload };
    default:
      return state;
  }
};

export const loungesReducer = (
  state = {
    loungesLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOUNGES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOUNGES_LIST_SUCCESS:
      return { ...state, loading: false, loungesLists: action.payload };
    default:
      return state;
  }
};

export const jacuzziReducer = (
  state = {
    jacuzziLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.JACUZZI_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.JACUZZI_LIST_SUCCESS:
      return { ...state, loading: false, jacuzziLists: action.payload };
    default:
      return state;
  }
};


export const conferenceareaReducer = (
  state = {
    conferenceareaLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CONFERENCEAREA_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CONFERENCEAREA_LIST_SUCCESS:
      return { ...state, loading: false, conferenceareaLists: action.payload };
    default:
      return state;
  }
};
export const shoppingReducer = (
  state = {
    shoppingLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SHOPPING_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SHOPPING_LIST_SUCCESS:
      return { ...state, loading: false, shoppingLists: action.payload };
    default:
      return state;
  }
};
export const childrenplayareaReducer = (
  state = {
    childrenplayareaLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHILDRENPLAYAREA_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CHILDRENPLAYAREA_LIST_SUCCESS:
      return { ...state, loading: false, childrenplayareaLists: action.payload };
    default:
      return state;
  }
};
export const templeReducer = (
  state = {
    templeLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TEMPLECHAPELPRAYERROOM_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.TEMPLECHAPELPRAYERROOM_LIST_SUCCESS:
      return { ...state, loading: false, templeLists: action.payload };
    default:
      return state;
  }
};

export const outdoorFurnitureReducer = (
  state = {
    outdoorFurnitureLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.OUTDOORFURNITURE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.OUTDOORFURNITURE_LIST_SUCCESS:
      return { ...state, loading: false, outdoorFurnitureLists: action.payload };
    default:
      return state;
  }
};


export const restaurantReducer = (
  state = {
    restaurantLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.RESTAURANT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.RESTAURANT_LIST_SUCCESS:
      return { ...state, loading: false, restaurantLists: action.payload };
    default:
      return state;
  }
};
export const spaReducer = (
  state = {
    spaLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SPA_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SPA_LIST_SUCCESS:
      return { ...state, loading: false, spaLists: action.payload };
    default:
      return state;
  }
};
export const gymReducer = (
  state = {
    gymLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GYM_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GYM_LIST_SUCCESS:
      return { ...state, loading: false, gymLists: action.payload };
    default:
      return state;
  }
};
export const salonReducer = (
  state = {
    salonLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SALON_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SALON_LIST_SUCCESS:
      return { ...state, loading: false, salonLists: action.payload };
    default:
      return state;
  }
};
export const steamReducer = (
  state = {
    steamLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.STEAMSAUNA_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STEAMSAUNA_LIST_SUCCESS:
      return { ...state, loading: false, steamLists: action.payload };
    default:
      return state;
  }
};