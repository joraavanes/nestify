import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

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
    cache: new InMemoryCache(),
    link: createHttpLink({uri: '/api'}), // localhost:5000/api if client runs on devServer
    defaultOptions,
});