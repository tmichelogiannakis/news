import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_SERVER_URL
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first'
    }
  },
  cache: new InMemoryCache({
    typePolicies: {
      news: {
        fields: {
          news: {
            merge(_existing = [], incoming: any[]) {
              return [...incoming];
            }
          }
        }
      }
    }
  })
});

export default client;
