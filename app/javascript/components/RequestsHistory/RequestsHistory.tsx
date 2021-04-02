import * as React from 'react';
import classes from './RequestsHistory.module.scss';
import { Table } from 'semantic-ui-react'

const { Row, Cell, HeaderCell, Header, Body } = Table;

export const RequestsHistory = ({ requests }) => {

  const formatedRequests = requests.map((request, idx) => {
    return (
      <Row key={idx}>
        <Cell>{request.input}</Cell>
        <Cell>{request.output}</Cell>
       </Row>
    )
  });

  return (
  <div className={classes.RequestsHistory}>
    <h3>Requests History:</h3>
    {requests && requests.length
    ? <Table className={classes.RequestsContainer}>
        <Header>
          <Row>
            <HeaderCell>Input</HeaderCell>
            <HeaderCell>Output</HeaderCell>
          </Row>
        </Header>
  
        <Body>
          {formatedRequests}
        </Body>
      </Table>
    : <p>'No Requests have been done yet!'</p>}

  </div>);
}
