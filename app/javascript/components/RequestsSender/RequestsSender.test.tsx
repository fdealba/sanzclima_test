import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import { RequestsSender } from './RequestsSender';


afterEach(cleanup);

describe('RequestsSender', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <RequestsSender lastOutput={10} submitDisabled={false} setQuery={() => { }} newRequest={() => { }} />
    );

    const keyInput = getByPlaceholderText('key');
    const valueInput = getByPlaceholderText('value');

    const addFieldButton = getByTestId('add');
    const sendRequestButton = getByTestId('send');

    expect(keyInput).toBeTruthy;
    expect(valueInput).toBeTruthy;
    expect(addFieldButton).toBeTruthy;
    expect(sendRequestButton).toBeTruthy;
  })

  it('should let you submit a new field', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <RequestsSender lastOutput={10} submitDisabled={false} setQuery={() => { }} newRequest={() => { }} />
    );

    const keyInput = getByPlaceholderText('key');
    const valueInput = getByPlaceholderText('value');
    userEvent.type(keyInput, 'hello');
    userEvent.type(valueInput, '200');

    expect(keyInput).toHaveProperty('value', 'hello');
    expect(valueInput).toHaveProperty('value', '200');

    const addFieldButton = getByTestId('add');
    userEvent.click(addFieldButton);

    expect(keyInput).toHaveProperty('value', '');
    expect(valueInput).toHaveProperty('value', '');
  })
})
