import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { hot } from "react-hot-loader";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/scss/main.scss";

import RegisterForm from "views/Register";
import LandingPage from "views/Landing";
import DomainSelection from "views/DomainSelection";
import TaskSelection from "views/TaskSelection";
import Task from "views/Task"
import DomainQuestions from 'views/DomainQuestions'
import Login from "views/Login";
import PrivateRoute from 'helper/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <LandingPage {...props} />} />
        <Route
          path="/Register"
          exact
          render={props => <RegisterForm {...props} />}
        />
        <PrivateRoute path="/Domains" exact component={DomainSelection} />
        {/* <Route path="/SelectDomain" exact render={props => <DomainSelection {...props} />} /> */}
        <PrivateRoute path="/Domain/:domain/tasks" exact component={TaskSelection} />
        <PrivateRoute path="/Domain/:domain/tasks/:taskId" exact component={Task} />
        <PrivateRoute path="/Domain/:domain/questions" exact component={DomainQuestions} />
        <Route path="/Login" exact render={props => <Login {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(module)(App);
