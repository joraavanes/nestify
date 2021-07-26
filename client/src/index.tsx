import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './components/App';
import Nest from './components/Nest';
import Nests from './components/Nests';

type IndexProps = {
    message: string
};

const Index: React.FC<IndexProps> = ({message}) => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={App} exact={true}/>
                <Route path="/nests" component={Nests} exact={true}/>
                <Route path="/nest" component={Nest} exact={true}/>
                <div>{message}</div>
                <p>Way to go</p>
            </Switch>
        </Router>
    );
};

render(
    <Index message="This sounds great"/>,
    document.querySelector('#main')
);