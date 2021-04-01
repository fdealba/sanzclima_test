import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
  requests: null
}

const setRequestsData = (state, action) => {
  return updateObject(state, { requests: action.requests });
}

const reducer = (state = initialState, action) => {
  //todos las acciones posibles
  switch (action.type) {
    case actionTypes.SET_PREVIOUS_REQUESTS : return setRequestsData(state, action);
    default: return state;
  }
}

export default reducer;

