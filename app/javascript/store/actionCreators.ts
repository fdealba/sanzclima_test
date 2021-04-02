import * as actionTypes from './actionTypes';
import axios from 'axios';

export const onFetchPreviousRequests = () => {
  return dispatch => {
    axios.get('api/v1/requests/history')
      .then( ({ data }) => {
        dispatch(setRequests(data));
      })
      .catch( error => {
        console.error(error);
      })
  };
};

export const setRequests = (state) => {
  return {
    type: actionTypes.SET_PREVIOUS_REQUESTS,
    requests: state
  };
};