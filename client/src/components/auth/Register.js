import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ setSigninMethod, setAlert }) => {
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
      //   const newUser = {
      //     name,
      //     email,
      //     password,
      //   };
      //   try {
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     };
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post("/api/users", body, config);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.error(err.response.data);
      //   }
      console.log("SUCCESS!");
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
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} required />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email.</small>
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
        Already have an account? <Link onClick={() => setSigninMethod("login")}>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Register;
