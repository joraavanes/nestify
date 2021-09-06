import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/ApolloClient';
import { Routes } from './routes';

const Index: React.FC = () => (
        <ApolloProvider client={client}>
            <Routes/>
        </ApolloProvider>
);

render(
    <Index/>,
    document.querySelector('#main')
);