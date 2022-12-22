import { ActionTypes } from "../actions/actionTypes";

export const AgentListReducer = (
  state = {
    agentLists: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.AGENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AGENT_LIST_SUCCESS:
      return { ...state, loading: false, agentLists: action.payload };
    default:
      return state;
  }
};

export const AgentDetailReducer = (
  state = { agentDetail: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.AGENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AGENT_DETAIL_SUCCESS:
      return { ...state, loading: false, agentDetail: action.payload };
    case ActionTypes.AGENT_CLEAR:
      return {
        ...state,
        agentDetail: {},
      };
    default:
      return state;
  }
};
