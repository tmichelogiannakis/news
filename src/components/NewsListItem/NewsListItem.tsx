import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaThumbsUp } from 'react-icons/fa';
import { News } from '../../graphql/generated/types';
import displayDate from '../../utils/display-date';

const StyledLi = styled.li`
  overflow: hidden;
  a {
    display: block;
    text-decoration: none;
    line-height: 1;
    position: relative;
    background: ${props => props.theme.colors.white};
    .article__image-wrapper {
      position: relative;
      &:before {
        height: 0;
        content: '';
        display: block;
        padding-bottom: 60%;
        background: ${props => props.theme.colors.gray[700]};
      }
      & > img {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .article__body {
      padding: 12px;
    }
    .article__body__top {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
      color: ${props => props.theme.colors.gray[700]};
      address {
        display: inline;
        font-style: normal;
      }
    }
    .article__body__title {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: ${props => props.theme.colors.black};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .article__body__likes {
      display: flex;
      align-items: center;
      color: ${props => props.theme.colors.black};
      font-weight: 500;
      svg {
        margin-right: 4px;
      }
    }
  }
`;

type NewsListItemProps = {
  data: Pick<News, 'uuid' | 'title' | 'date' | 'author' | 'likes'>;
};

const NewsListItem = ({ data }: NewsListItemProps): JSX.Element => {
  const date = data.date ? new Date(data.date) : null;

  return (
    <StyledLi
      as={motion.li}
      variants={{
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        }
      }}
      whileHover={{ scale: 1.025 }}
      layoutId={`article-${data.uuid}`}
    >
      <Link to={data.uuid ?? '/'} state={{ ...data }}>
        <motion.div
          className="article__image-wrapper"
          layoutId={`article-image-${data.uuid}`}
        >
          <img
            alt={data.title ?? ''}
            src={`https://loremflickr.com/1000/600/?lock=${data.uuid}`}
          />
        </motion.div>
        <div className="article__body">
          <div className="article__body__top">
            <motion.address layoutId={`article-address-${data.uuid}`}>
              {data.author}
            </motion.address>
            {date && (
              <motion.time
                layoutId={`article-time-${data.uuid}`}
                dateTime={date.toISOString()}
              >
                {displayDate(date)}
              </motion.time>
            )}
          </div>
          <motion.h2
            className="article__body__title"
            layoutId={`article-title-${data.uuid}`}
          >
            {data.title}
          </motion.h2>
          <div className="article__body__likes">
            <FaThumbsUp /> {data.likes}
          </div>
        </div>
      </Link>
    </StyledLi>
  );
};

export default NewsListItem;
