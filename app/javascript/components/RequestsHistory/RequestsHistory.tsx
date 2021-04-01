import * as React from 'react';
import classes from './RequestsHistory.module.scss';

export const RequestsHistory = ({ requests }) => {

  const formatedRequests = requests && requests.length
  ? requests.map((request, idx) => {
    return (
      <div key={idx}>
        <p>Input: {request.input}</p>
        <p>Output: {request.output}</p>
      </div>
    )
  })
  : 'No Requests have been done yet!';

  return (
  <div className={classes.RequestsHistory}>
    <h3>Requests History:</h3>
    <div className={classes.RequestsContainer}>
      {formatedRequests}
    </div>
  </div>);
}
