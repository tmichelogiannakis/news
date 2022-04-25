import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import theme, { GlobalStyle } from './theme';
import apolloClient from './apollo/client';
import NewsListPage from './pages/NewsList/NewsListPage';
import SingleNewsPage from './pages/SingleNewsPage/SingleNewsPage';

const Container = styled.div`
  padding: 40px;
`;

const Main = () => {
  const location = useLocation();
  return (
    <Container>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<NewsListPage />} />
          <Route path="/:newsId" element={<SingleNewsPage />} />
        </Routes>
      </AnimatePresence>
    </Container>
  );
};

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
      // @ts-ignore */}
      <AnimateSharedLayout type="crossfade">
        <BrowserRouter>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </BrowserRouter>
      </AnimateSharedLayout>
    </ThemeProvider>
  );
};

export default App;
