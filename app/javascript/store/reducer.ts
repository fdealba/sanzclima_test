import * as actionTypes from './actionTypes';
import { updateObject } from './utility';
import { Request } from '../components/App';

export interface AppState {
  requests: Request[];
}

const initialState: AppState = {
  requests: []
}

const setRequestsData = (state: AppState, action: AppState) => {
  return updateObject(state, { requests: action.requests });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PREVIOUS_REQUESTS : return setRequestsData(state, action);
    default: return state;
  }
}

export default reducer;

