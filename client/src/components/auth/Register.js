import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Register = () => {
  const [signinMethod, setSigninMethod] = useState("register");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = registerData;

  const onSubmit = (e) => {
    console.log(e);
  };

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <div className="register">
      <div className={signinMethod === "register" ? "left stickLeft registerContainer" : "left stickRight stayBelow loginContainer"}>
        <h1>Create Account</h1>
        <div className="sns">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-google"></i>
        </div>
        <span>Or Sign Up with Your Email</span>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onChange(e)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} minLength="6" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={(e) => onChange(e)} minLength="6" />
          </div>
          <input type="submit" className="btn btn-primary registerBtn" value="REGISTER" />
        </form>
        <p className="extraContent">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
      <div className={signinMethod === "register" ? "right stayBelow stickLeft" : "right stickRight"}>
        <h1>Sign In</h1>
        <div className="sns">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-google"></i>
        </div>
        <span>Or Sign In with Your Account</span>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} minLength="6" />
          </div>
          <input type="submit" className="btn btn-primary loginBtn" value="LOGIN" />
        </form>
        <p className="extraContent">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className={signinMethod === "register" ? "overlay stickRight" : "overlay stickLeft"}>
        {signinMethod === "register" ? (
          <Fragment>
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

export default Register;
