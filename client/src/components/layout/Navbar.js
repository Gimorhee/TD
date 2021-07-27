import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <i className="fas fa-dog" />
        <Link to="/">
          <h1>TinDog</h1>
        </Link>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/petProfile">Dogs</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
