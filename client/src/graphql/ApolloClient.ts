import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({uri: '/api'}) // localhost:5000/api if client runs on devServer
});