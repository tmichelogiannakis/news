import styled from 'styled-components';
import { motion } from 'framer-motion';
import { News } from '../../graphql/generated/types';
import NewsListItem from '../NewsListItem/NewsListItem';

const animations = {
  initial: 'initial',
  animate: 'animate',
  variants: {
    animate: {
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  }
};

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

type NewsListProps = {
  data: Pick<News, 'uuid' | 'title' | 'date' | 'author' | 'likes'>[];
};

const NewsList = ({ data }: NewsListProps): JSX.Element => {
  return (
    <StyledList as={motion.ul} {...animations}>
      {data.map(item => (
        <NewsListItem key={item.uuid} data={item} />
      ))}
    </StyledList>
  );
};

export default NewsList;
