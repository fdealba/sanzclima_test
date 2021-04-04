import * as actionTypes from './actionTypes';
import { updateObject } from './utility';
import { Request } from '../components/App';

export interface AppState {
  requests: Request[];
}

export interface Actions {
  type: "SET_PREVIOUS_REQUESTS" | "APPEND_LAST_REQUEST",
  requests?: Request[];
  request?: Request;
};

const initialState: AppState = {
  requests: []
}

const setRequestsData = (state: AppState, action: Actions) => {
  return updateObject(state, { requests: action.requests });
}

const appendRequestData = (state: AppState, action: Actions) => {
  return {
    requests: [action.request, ...state.requests]
  }
}

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case actionTypes.SET_PREVIOUS_REQUESTS: return setRequestsData(state, action);
    case actionTypes.APPEND_LAST_REQUEST: return appendRequestData(state, action);
    default: return state;
  }
}

export default reducer;

