import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({uri: 'http://localhost:5000/api'})
});