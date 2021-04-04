import * as actionTypes from './actionTypes';
import axios from 'axios';
import { Actions } from './reducer';
import { Request } from '../components/App';

export const onFetchPreviousRequests = () => {
  return dispatch => {
    axios.get('api/v1/requests/history')
      .then(({ data }) => {
        dispatch(setRequests(data));
      })
      .catch(error => {
        console.error(error);
      })
  };
};

export const setRequests = (state: Request[]) => {
  return {
    type: actionTypes.SET_PREVIOUS_REQUESTS,
    requests: state
  } as unknown as Actions;
};

export const onAppendLastRequest = (request: Request) => {
  return {
    type: actionTypes.APPEND_LAST_REQUEST,
    request: request
  }
}