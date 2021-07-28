import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Login = ({ setSigninMethod }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("SUCCESS!");
  };

  return (
    <Fragment>
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
        Don't have an account? <Link onClick={() => setSigninMethod("register")}>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
