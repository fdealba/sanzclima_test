import * as React from 'react';

// Style
import classes from './RequestsHistory.module.scss';

// Semantic UI Components
import { Table } from 'semantic-ui-react';

// Types
import { Request } from '../App';

// Destructured variables for Table
const { Row, Cell, HeaderCell, Header, Body } = Table;

// Prop Types
interface Props {
  requests: Request[];
}

export const RequestsHistory: React.FC<Props> = ({ requests }) => {
  
  const formatedRequests = requests.map((request, idx: number) => {
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
    { requests && requests.length
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
    : <p>'No Requests have been done yet!'</p> }

  </div>);
}
