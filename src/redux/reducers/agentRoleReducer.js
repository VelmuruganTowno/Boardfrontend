import { ActionTypes } from "../actions/actionTypes";

export const AgentRoleListReducer = (
  state = {
    agentRoleLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.AGENTROLE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AGENTROLE_LIST_SUCCESS:
      return { ...state, loading: false, agentRoleLists: action.payload };
    default:
      return state;
  }
};

export const AgentRoleDetailReducer = (
  state = { agentRoleDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.AGENTROLE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AGENTROLE_DETAIL_SUCCESS:
      return { ...state, loading: false, agentRoleDetail: action.payload };
    case ActionTypes.AGENTROLE_CLEAR:
      return {
        ...state,
        agentRoleDetail: {},
      };
    default:
      return state;
  }
};
