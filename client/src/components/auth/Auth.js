import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Register from "./Register";
import Login from "./Login";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register, login } from "../../actions/auth";
import PropTypes from "prop-types";

const Auth = ({ setAlert, register, login, isAuthenticated }) => {
  const [signinMethod, setSigninMethod] = useState("register");

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth">
      {/* REGISTER */}
      <div className={signinMethod === "register" ? "stickLeft registerContainer" : "stickRight stayBelow registerContainer"}>
        <div className="innerContainer">
          <Register setSigninMethod={setSigninMethod} setAlert={setAlert} register={register} />
        </div>
        <div className="bgOverlay"></div>
      </div>

      {/* LOGIN */}
      <div className={signinMethod === "login" ? "loginContainer stickRight" : "loginContainer stayBelow stickLeft"}>
        <div className="innerContainer">
          <Login setSigninMethod={setSigninMethod} setAlert={setAlert} login={login} />
        </div>
        <div className="bgOverlay"></div>
      </div>

      {/* OVERLAY */}
      <div className={signinMethod === "register" ? "overlay stickRight" : "overlay stickLeft"}>
        {signinMethod === "register" ? (
          <Fragment>
            {/* REGISTER OVERLAY */}
            <div className="overlayContent">
              <h1>HI THERE!</h1>
              <p>Already a member? Sign in and get started now!</p>
              <Button secondary size="huge" onClick={() => setSigninMethod("login")}>
                LOGIN
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {/* LOGIN OVERLAY */}
            <div className="overlayContent">
              <h1>WELCOME BACK!</h1>
              <p>Not a member yet? Sign up and get started now!</p>
              <Button secondary size="huge" onClick={() => setSigninMethod("register")}>
                REGISTER
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Auth.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, login })(Auth);
