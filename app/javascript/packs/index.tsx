import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../components/App';

// Redux - Thunk
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import appReducer from '../store/reducer';

// Axios
import axios from 'axios';

// Semantic UI
import 'semantic-ui-css/semantic.min.css'

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

const body = document.querySelector('.container');

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, body);
