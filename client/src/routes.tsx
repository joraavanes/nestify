import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
const Login = lazy(() => import('./components/Auth/Login'));
const App = lazy(() => import('./components/App'));
const Nest = lazy(() => import('./components/Nest'));
const Nests = lazy(() => import( './components/Nests'));

export const Routes: React.FC = () => (
    <Router>
        <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
                <Redirect from="/" to="/nests" exact/>
                <Route path="/" component={App} exact={true}/>
                <Route path="/nests" component={Nests} exact={true}/>
                <Route path="/nest/:id" component={Nest} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
            </Switch>
        </Suspense>
    </Router>
);