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
    onFetchLastOutputFromLocalStorage();
  }, [])

  const onFetchLastOutputFromLocalStorage = () => {
    if (localStorage.getItem("last_output")) {
      setLastOutput(Number(localStorage.getItem("last_output")));
    }
  }

  const handleNewRequest = () => {
    // New error if none of the values are numbers.
    if (Object.values(query).some(value => Number(value) >= 0)) {
      axios.post('api/v1/requests/new', {
        ...query
      }).then(({ data: { input, output } }) => {
        handleNewRequestResponseData(input, output);
      })
    } else {
      setError(true);
    }
  }

  const handleNewRequestResponseData = (input: string, output: number) => {
    // Add new request to avoid calling requests/history again
    onAppendLastRequest({ input: input, output: String(output) });
    // Save output in localstorage
    localStorage.setItem('last_output', String(output));
    setLastOutput(output);
    // Clean the query
    setQuery({});
  }

  return (
    <>
      {error
        ? <ErrorModal
          setError={setError}
          errorMessage="Please enter a number value in any of the values" />
        : ''}
      <h3 style={{ textAlign: 'center' }}>Your query:</h3>
      <p style={{ textAlign: 'center' }} data-testid="query">
        {JSON.stringify(query)}
      </p>
      <RequestsSender
        lastOutput={lastOutput}
        setQuery={setQuery}
        submitDisabled={!Object.values(query).length}
        onNewRequestClicked={handleNewRequest} />
      <RequestsHistory
        requests={requests} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPreviousRequests: () => dispatch(appActions.onFetchPreviousRequests()),
    onAppendLastRequest: (request: Request) => dispatch(appActions.onAppendLastRequest(request))
  };
}

const mapStateToProps = (state: AppState) => {
  return {
    requests: state.requests
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
