import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { cache } from '../graphql/cache'

const defaultOptions: any = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
};

export const client = new ApolloClient({
    cache,
    link: createHttpLink({uri: 'http://localhost:5000/api'}), // localhost:5000/api if client runs on devServer
    defaultOptions,
});