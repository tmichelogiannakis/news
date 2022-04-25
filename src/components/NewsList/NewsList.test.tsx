import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import theme from '../../theme';
import NewsList from './NewsList';

test('renders without crashing', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <NewsList
          data={[
            {
              uuid: '5143611f-06da-44eb-b238-366129b605a3',
              title: 'Amet pellentesque.',
              date: 'Thu Dec 31 2020 03:45:08 GMT+0200 (Eastern European Standard Time)',
              author: 'Janett Winter',
              likes: 11
            },
            {
              uuid: '78a04b09-a128-4764-b203-b61522f6b6d2',
              title:
                'En tortor nunc nisi mattis pharetra, au a ex consectetur.',
              date: 'Mon Nov 11 2019 05:33:19 GMT+0200 (Eastern European Standard Time)',
              author: 'Lloyd Bradbury',
              likes: 2
            }
          ]}
        />
      </MemoryRouter>
    </ThemeProvider>
  );
  expect(container).toBeTruthy();
});
