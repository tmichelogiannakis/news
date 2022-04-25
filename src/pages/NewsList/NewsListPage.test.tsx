import { render, waitFor, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MockedProvider as MockedApolloProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import theme from '../../theme';
import NewsListPage from './NewsListPage';
import { FetchNewsDocument } from '../../graphql/generated/hooks';

let fetchNewsQueryCalled = false;

const fetchNewsQuery = {
  request: {
    query: FetchNewsDocument
  },
  result: () => {
    fetchNewsQueryCalled = true;
    return {
      data: {
        news: [
          {
            uuid: '5143611f-06da-44eb-b238-366129b605a3',
            title: 'Amet pellentesque.',
            date: 'Thu Dec 31 2020 03:45:08 GMT+0200 (Eastern European Standard Time)',
            author: 'Janett Winter',
            likes: 11,
            __typename: 'News'
          },
          {
            uuid: '78a04b09-a128-4764-b203-b61522f6b6d2',
            title: 'En tortor nunc nisi mattis pharetra, au a ex consectetur.',
            date: 'Mon Nov 11 2019 05:33:19 GMT+0200 (Eastern European Standard Time)',
            author: 'Lloyd Bradbury',
            likes: 2,
            __typename: 'News'
          },
          {
            uuid: 'ecd3d302-565f-41ed-843b-04a67fa072aa',
            title: 'Vel gravida dictum eros mattis sollicitudin.',
            date: 'Sun Jan 03 2021 00:41:49 GMT+0200 (Eastern European Standard Time)',
            author: 'Rolf Shelly',
            likes: 0,
            __typename: 'News'
          }
        ]
      }
    };
  }
};

test('renders without crashing', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MockedApolloProvider mocks={[fetchNewsQuery]}>
          <NewsListPage />
        </MockedApolloProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
  await waitFor(() => {
    expect(fetchNewsQueryCalled).toBe(true);
    expect(screen.getAllByRole('heading').length).toBe(3);
  });
});
