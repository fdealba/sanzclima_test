import * as React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducer';
import thunk from 'redux-thunk';


import App from './App';

afterEach(cleanup);

let store;
describe('App', () => {
  beforeEach(() => {
    store = createStore(reducer, compose(applyMiddleware(thunk)));
  })

  it('should let you add a new field correctly', async () => {
    const { getByPlaceholderText, getByTestId, debug, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const keyInput = getByPlaceholderText('key');
    const valueInput = getByPlaceholderText('value');

    userEvent.type(keyInput, 'number');
    userEvent.type(valueInput, '200');

    const addNewFieldButton = getByTestId('add');

    userEvent.click(addNewFieldButton);

    expect(keyInput).toHaveProperty('value', '');
    expect(valueInput).toHaveProperty('value', '');

    const displayText = getByText('{"number":200}');

    await waitFor(() => expect(displayText).toBeTruthy)
  });
})
