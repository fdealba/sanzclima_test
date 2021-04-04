import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorModal from './ErrorModal';
import userEvent from '@testing-library/user-event';


afterEach(cleanup);

describe('ErrorModal', () => {
  it('should render', () => {
    const { getByText, getByTestId } = render(
      <ErrorModal setError={() => { }} errorMessage={"error!"} />
    );

    expect(getByText('error!')).toBeTruthy;
    expect(getByTestId('close')).toBeTruthy;
  })

  it('be able to close itself', async () => {
    const { getByTestId, getByText } = render(
      <ErrorModal setError={() => { }} errorMessage={"error!"} />
    );
    const closeButton = getByTestId('close');
    const errorMessage = getByText('error!');

    userEvent.click(closeButton);

    expect(closeButton).toBeNull;
    expect(errorMessage).toBeNull;
  })
})