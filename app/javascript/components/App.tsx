import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as appActions from '../store/actionCreators';
import { connect } from 'react-redux';


const { useEffect } = React;
const App = props => {

  useEffect(() => {
    props.onFetchPreviousRequests()
  }, [])

  return (
    <Switch>
      <Route exact path="/" render={() => ("home")}/>
      <Route path="/hello" render={() => ("Hello")}/>
    </Switch>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPreviousRequests: () => dispatch(appActions.onFetchPreviousRequests())
  };
}

export default connect(null, mapDispatchToProps)(App);
