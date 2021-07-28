import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ setSigninMethod, setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password do not match!", "red");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <h1>Create Account</h1>
      <div className="sns">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-google"></i>
      </div>
      <span>Or Sign Up with Your Email</span>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email.</small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={(e) => onChange(e)} />
        </div>
        <input type="submit" className="btn btn-primary registerBtn" value="REGISTER" />
      </form>
      <p className="extraContent">
        Already have an account? <Link onClick={() => setSigninMethod("login")}>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default Register;
