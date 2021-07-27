import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './components/App';
import Nest from './components/Nest';
import Nests from './components/Nests';
import { 
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider
 } from '@apollo/client'

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
                <Switch>
                    <Route path="/" component={App} exact={true}/>
                    <Route path="/nests" component={Nests} exact={true}/>
                    <Route path="/nest" component={Nest} exact={true}/>
                </Switch>
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