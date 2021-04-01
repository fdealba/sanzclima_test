import * as React from 'react';

// ActionCreators
import * as appActions from '../store/actionCreators';

// Redux
import { connect } from 'react-redux';

// Components
import { RequestsHistory } from './RequestsHistory/RequestsHistory';
import { RequestsSender } from './RequestsSender/RequestsSender';


const { useEffect } = React;

const App = props => {
  useEffect(() => {
    props.onFetchPreviousRequests()
  }, [])

  return (
    <>
      <RequestsSender/>
      <RequestsHistory requests={props.requests}/>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPreviousRequests: () => dispatch(appActions.onFetchPreviousRequests())
  };
}
const mapStateToProps = (state) => {
  return {
    requests: state.requests
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
