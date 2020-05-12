import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";



const PrivateRoute = ({ component: Component, isLoggedin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedin === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const mapStateToProps = ({ user }) => ({
  isLoggedin: user.isLoggedin
});

export default connect(mapStateToProps, {})(PrivateRoute);
