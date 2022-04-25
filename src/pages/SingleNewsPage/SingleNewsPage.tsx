import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import {
  FetchNewsDocument,
  FetchSingleNewsDocument,
  useDeleteMutation,
  useDislikeMutation,
  useFetchSingleNewsLazyQuery,
  useFetchSingleNewsQuery,
  useLikeMutation
} from '../../graphql/generated/hooks';
import { FetchSingleNewsQuery } from '../../graphql/generated/operations';
import { News } from '../../graphql/generated/types';
import Skeleton from '../../components/Skeleton/Skeleton';
import displayDate from '../../utils/display-date';

const StyledLink = styled(Link)`
  margin-top: 8px;
  color: ${props => props.theme.colors.primary[500]};
  text-decoration: none;
  display: inline-block;
`;

const DangerButton = styled.button`
  outline: none;
  font-size: 1rem;
  line-height: 1;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: ${props => props.theme.radii.base};
  text-transform: uppercase;
  border-style: solid;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.danger[500]};
  border-color: ${props => props.theme.colors.danger[500]};
  :hover {
    background: ${props => props.theme.colors.danger[400]};
  }
`;

const IconButton = styled.button`
  outline: none;
  font-size: 1rem;
  line-height: 1;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: ${props => props.theme.radii.base};
  text-transform: uppercase;
  border-style: solid;
  color: ${props => props.theme.colors.primary[500]};
  background: transparent;
  border-color: transparent;
  :hover {
    color: ${props => props.theme.colors.primary[400]};
  }
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  .article {
    padding: 20px;
    background: #ffffff;
    border-radius: ${props => props.theme.radii.large};
  }
  .article__date {
    color: ${props => props.theme.colors.gray[700]};
  }
  .article__title {
    h1 {
      font-size: 2.25rem;
      margin-top: 8px;
      margin-bottom: 8px;
      font-weight: 500;
      line-height: 1.1;
    }
  }
  .article__author {
    text-align: right;
    color: ${props => props.theme.colors.gray[700]};
    font-style: normal;
    margin-bottom: 8px;
  }
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
  .article__text {
    margin-top: 16px;
    margin-bottom: 16px;
    line-height: 1.25;
  }
  .article__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    color: ${props => props.theme.colors.black};
  }
`;

const animations = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25
      }
    }
  }
};

const SingleNewsPage = () => {
  const theme = useTheme();

  const { state } = useLocation();

  const navigate = useNavigate();

  const { newsId } = useParams() as { newsId: string };

  const { data: fetchSingleNewsQueryData, loading } = useFetchSingleNewsQuery({
    variables: {
      uuid: newsId
    }
  });

  /* const [fetchSingleNews, { data: fetchSingleNewsQueryData, loading }] =
    useFetchSingleNewsLazyQuery({ fetchPolicy: 'cache-first' });

  useEffect(() => {
    fetchSingleNews({
      variables: {
        uuid: newsId
      }
    });
  }, [newsId, fetchSingleNews]); */

  // navigate to home in case the uuid does not return a singleNews
  useEffect(() => {
    if (fetchSingleNewsQueryData?.singleNews === null) {
      console.error('404: SingleNews Not Found');
      navigate('/', { replace: true });
    }
  }, [fetchSingleNewsQueryData?.singleNews, navigate]);

  const [like] = useLikeMutation();

  const [dislike] = useDislikeMutation();

  const [deleteSingleNews] = useDeleteMutation();

  const handleLike = () => {
    like({
      variables: { uuid: newsId },
      // update FetchSingleNewsDocument query cache
      update(cache, result) {
        cache.updateQuery(
          {
            query: FetchSingleNewsDocument,
            variables: { uuid: newsId }
          },
          data => {
            return {
              singleNews: {
                ...data.singleNews,
                likes: result.data?.like?.likes
              }
            };
          }
        );
        // update FetchNewsDocument query cache
        cache.updateQuery(
          {
            query: FetchNewsDocument
          },
          data => {
            const news = data?.news;
            if (news) {
              return {
                news: news.map((item: any) => {
                  if (item.uuid === newsId) {
                    return { ...item, likes: result.data?.like?.likes };
                  }
                  return item;
                })
              };
            }
            return null;
          }
        );
      }
    });
  };

  const handleDisLike = () => {
    dislike({
      variables: { uuid: newsId },
      update(cache, result) {
        // update FetchSingleNewsDocument query cache
        cache.updateQuery(
          {
            query: FetchSingleNewsDocument,
            variables: { uuid: newsId }
          },
          data => {
            return {
              singleNews: {
                ...data.singleNews,
                likes: result.data?.dislike?.likes
              }
            };
          }
        );
        // update FetchNewsDocument query cache
        cache.updateQuery(
          {
            query: FetchNewsDocument
          },
          data => {
            const news = data?.news;
            if (news) {
              return {
                news: news.map((item: any) => {
                  if (item.uuid === newsId) {
                    return { ...item, likes: result.data?.dislike?.likes };
                  }
                  return item;
                })
              };
            }
            return null;
          }
        );
      }
    });
  };

  const handleDelete = () => {
    const confirmAction = confirm(`Are you sure you want to delete this?`);
    // confirm delete, mutate delete and navigate to home page
    if (confirmAction) {
      deleteSingleNews({
        variables: { uuid: newsId },
        update(cache, result) {
          const news = result.data?.delete ?? [];
          // update FetchNewsDocument query cache before go back to home page from delete resuts
          cache.updateQuery(
            {
              query: FetchNewsDocument
            },
            () => ({ news })
          );
        },
        onCompleted: () => {
          navigate('/', { replace: true });
        }
      });
    }
  };

  const singleNews = {
    ...(state as Partial<News>),
    ...fetchSingleNewsQueryData?.singleNews
  } as NonNullable<FetchSingleNewsQuery['singleNews']>;

  const date = singleNews.date ? new Date(singleNews.date) : null;

  return (
    <Container
      as={motion.div}
      {...animations}
      layoutId={`article-${singleNews.uuid}`}
    >
      <div className="article">
        {date ? (
          <motion.time
            className="article__date"
            dateTime={date.toISOString()}
            layoutId={`article-time-${singleNews.uuid}`}
          >
            {displayDate(date)}
          </motion.time>
        ) : loading ? (
          <Skeleton height="1rem" />
        ) : null}

        {singleNews.title ? (
          <motion.h1
            className="article__title"
            layoutId={`article-title-${singleNews.uuid}`}
          >
            {singleNews.title}
          </motion.h1>
        ) : loading ? (
          <Skeleton height="3rem" margin="8px 0" />
        ) : null}

        {singleNews.author ? (
          <motion.address
            className="article__author"
            layoutId={`article-address-${singleNews.uuid}`}
          >
            {singleNews.author}
          </motion.address>
        ) : loading ? (
          <Skeleton height="1rem" margin="0 0 8px 0" />
        ) : null}

        <motion.div
          className="article__image-wrapper"
          layoutId={`article-image-${singleNews.uuid}`}
        >
          <img
            alt={singleNews.title ?? ''}
            src={`https://loremflickr.com/1000/600/?lock=${singleNews.uuid}`}
          />
        </motion.div>

        {singleNews.text ? (
          <div
            className="article__text"
            dangerouslySetInnerHTML={{ __html: singleNews.text }}
          ></div>
        ) : (
          <Skeleton height="5rem" margin="16px 0" />
        )}
        <div className="article__actions">
          <div>
            <IconButton
              aria-label="Dislike"
              as={motion.button}
              onClick={handleDisLike}
              whileHover={{
                scale: 1.1,
                color: theme.colors.primary[400],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
            >
              <FaThumbsDown />
            </IconButton>
            {singleNews.likes}
            <IconButton
              aria-label="Like"
              as={motion.button}
              onClick={handleLike}
              whileHover={{
                scale: 1.1,
                color: theme.colors.primary[400],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
            >
              <FaThumbsUp />
            </IconButton>
          </div>
          <div>
            <DangerButton onClick={handleDelete}>Delete</DangerButton>
          </div>
        </div>
      </div>
      <StyledLink to="/">Back to Home</StyledLink>
    </Container>
  );
};

export default SingleNewsPage;
