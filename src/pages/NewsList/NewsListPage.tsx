import styled from 'styled-components';
import { useFetchNewsQuery } from '../../graphql/generated/hooks';
import { motion } from 'framer-motion';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const animations = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit'
};

const LoadingWrapper = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const NewsListPage = () => {
  const { data, loading } = useFetchNewsQuery();

  return (
    <Container as={motion.div} {...animations}>
      {data?.news ? (
        <NewsList data={data.news.filter(notEmpty)} />
      ) : (
        loading && (
          <LoadingWrapper>
            {Array(10)
              .fill(undefined)
              .map((_, i) => (
                <Skeleton height="360px" key={i} />
              ))}
          </LoadingWrapper>
        )
      )}
    </Container>
  );
};

export default NewsListPage;
