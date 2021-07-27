import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [signinMethod, setSigninMethod] = useState(false);
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
      <button onClick={() => setSigninMethod(!signinMethod)}>hihi</button>
      <div className={signinMethod === false ? "left stickLeft" : "left stickRight stayBelow"}>
        <h1>Create Account</h1>
        <div className="sns">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-google"></i>
        </div>
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
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
      <div className={signinMethod === false ? "right stickLeft" : "right stickRight"}>
        <h1>Sign In</h1>
        <p>
          <i className="fas fa-user"></i> Sign In with Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} minLength="6" />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className={signinMethod === false ? "overlay stickRight" : "overlay stickLeft"}>{signinMethod === false ? <div>HI THERE</div> : <div>WELCOME BACK!</div>}</div>
    </div>
  );
};

export default Register;
