import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { RequestsHistory } from './RequestsHistory';


afterEach(cleanup);

describe('RequestsHistory', () => {
  it('should render every request', () => {
    const { getAllByText } = render(
      <RequestsHistory requests={[{ input: "10", output: "10" }, { input: "20", output: "20" }]} />
    );

    expect(getAllByText('10')).toHaveLength(2)
    expect(getAllByText('20')).toHaveLength(2)
  })

  it('should render a secondary message if there is no requests', () => {
    const { getByTestId, getByText } = render(
      <RequestsHistory requests={[]} />
    );

    const secondaryTextById = getByTestId('no-requests-message');
    expect(secondaryTextById).toBeTruthy;

    const secondayTextByText = getByText('No Requests have been done yet!');
    expect(secondayTextByText).toBeTruthy;
  })
})
