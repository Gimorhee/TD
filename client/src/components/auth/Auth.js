import React, { useState, Fragment } from "react";
import { Button } from "semantic-ui-react";
import Register from "./Register";
import Login from "./Login";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const Auth = ({ setAlert }) => {
  const [signinMethod, setSigninMethod] = useState("register");

  return (
    <div className="auth">
      {/* REGISTER */}
      <div className={signinMethod === "register" ? "stickLeft registerContainer" : "stickRight stayBelow registerContainer"}>
        <div className="innerContainer">
          <Register setSigninMethod={setSigninMethod} setAlert={setAlert} />
        </div>
        <div className="bgOverlay"></div>
      </div>

      {/* LOGIN */}
      <div className={signinMethod === "login" ? "loginContainer stickRight" : "loginContainer stayBelow stickLeft"}>
        <div className="innerContainer">
          <Login setSigninMethod={setSigninMethod} />
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

export default connect(null, { setAlert })(Auth);
