import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
const App = lazy(() => import('./components/App'));
const Nest = lazy(() => import('./components/Nest'));
const Nests = lazy(() => import( './components/Nests'));

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({uri: 'http://localhost:3000/graphql'})
})

type IndexProps = {
    message: string
};

const Index: React.FC<IndexProps> = ({message}) => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        <Route path="/" component={App} exact={true}/>
                        <Route path="/nests" component={Nests} exact={true}/>
                        <Route path="/nest" component={Nest} exact={true}/>
                    </Switch>
                </Suspense>
                {/* <div>{message}</div>
                <p>Way to go</p> */}
            </Router>
        </ApolloProvider>
    );
};

render(
    <Index message="This sounds great"/>,
    document.querySelector('#main')
);