import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const App = lazy(() => import('./components/App'));
const Nest = lazy(() => import('./components/Nest/Nest'));
const Nests = lazy(() => import( './components/Nest/Nests'));
const AddNest = lazy(() => import('./components/Dashboard/AddNest'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const EditNest = lazy(() => import('./components/Dashboard/EditNest'));
const Users = lazy(() => import('./components/Dashboard/Users'));
const Navigation = lazy(() => import('./components/shared/Navigation'));

export const Routes: React.FC = () => (
    <Router>
        <Suspense fallback={<div>Loading ...</div>}>
            <Navigation/>
            <Switch>
                <Redirect from="/" to="/nests" exact/>
                <Route path="/" component={App} exact={true}/>
                <Route path="/nests" component={Nests} exact={true}/>
                <Route path="/nest/:id" component={Nest} exact={true}/>
                <Route path="/dashboard" component={Dashboard} exact={true}/>
                <Route path="/dashboard/addnest" component={AddNest} exact={true}/>
                <Route path="/dashboard/EditNest/:id" component={EditNest} exact={true}/>
                <Route path="/dashboard/users" component={Users} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/register" component={Register} exact={true}/>
            </Switch>
        </Suspense>
    </Router>
);