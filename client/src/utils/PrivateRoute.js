import React, { useEffect, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, setAlert, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Fragment>
            {setAlert("Not Authorized. Please login first!", "red")}
            <Redirect to="auth" />
          </Fragment>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(PrivateRoute);
