import * as React from 'react';
import axios from 'axios';

// ActionCreators
import * as appActions from '../store/actionCreators';

// Redux
import { connect } from 'react-redux';

// Components
import { RequestsHistory } from './RequestsHistory/RequestsHistory';
import { RequestsSender } from './RequestsSender/RequestsSender';
import ErrorModal from './ErrorModal/ErrorModal';

// Types
import { AppState } from '../store/reducer';

export interface Request {
  input: string;
  output: string;
}

// Prop Types
interface Props {
  onFetchPreviousRequests: () => void;
  onAppendLastRequest: (request: Request) => void;
  requests: Request[];
}

const { useEffect, useState } = React;

const App: React.FC<Props> = ({ onFetchPreviousRequests, requests, onAppendLastRequest }) => {
  const [lastOutput, setLastOutput] = useState(0);
  const [query, setQuery] = useState({});
  const [error, setError] = useState(false);


  useEffect(() => {
    onFetchPreviousRequests();
    if (localStorage.getItem("last_output")) {
      setLastOutput(Number(localStorage.getItem("last_output")));
    }
  }, [])

  const newRequest = () => {
    // New error if none of the values are numbers.
    if (Object.values(query).some(value => Number(value) >= 0)) {
      axios.post('api/v1/requests/new', {
        ...query
      }).then(({ data: { input, output } }) => {
        onAppendLastRequest({ input: input, output: output });
        localStorage.setItem('last_output', output);
        setLastOutput(output);
        setQuery({});
      })
    } else {
      setError(true);
    }
  }

  return (
    <>
      {error ? <ErrorModal setError={setError} errorMessage="Please enter a number value in any of the values" /> : ''}
      <h3 style={{ textAlign: 'center' }}>Your query:</h3>
      <p style={{ textAlign: 'center' }} data-testid="query">
        {JSON.stringify(query)}
      </p>
      <RequestsSender lastOutput={lastOutput} setQuery={setQuery} submitDisabled={!Object.values(query).length} newRequest={newRequest} />
      <RequestsHistory requests={requests} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPreviousRequests: () => dispatch(appActions.onFetchPreviousRequests()),
    onAppendLastRequest: (request) => dispatch(appActions.onAppendLastRequest(request))
  };
}

const mapStateToProps = (state: AppState) => {
  return {
    requests: state.requests
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
