import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import theme from '../../theme';
import NewsListItem from './NewsListItem';

test('renders without crashing', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <NewsListItem
          data={{
            author: 'Janett Winter',
            date: 'Thu Dec 31 2020 03:45:08 GMT+0200 (Eastern European Standard Time)',
            likes: 11,
            title: 'Amet pellentesque.',
            uuid: '5143611f-06da-44eb-b238-366129b605a3'
          }}
        />
      </MemoryRouter>
    </ThemeProvider>
  );
  expect(container).toBeTruthy();
});

test('renders without crashing when item props are undefined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <NewsListItem data={{}} />
      </MemoryRouter>
    </ThemeProvider>
  );
  expect(container).toBeTruthy();
});
