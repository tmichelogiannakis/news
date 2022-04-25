import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import Skeleton from './Skeleton';

test('renders without crashing', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Skeleton />
    </ThemeProvider>
  );
  expect(container).toBeTruthy();
});
