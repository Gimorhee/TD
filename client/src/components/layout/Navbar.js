import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { withRouter } from "react-router-dom";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, history }) => {
  const [navStatus, setNavStatus] = useState(true);

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <Button as="div" labelPosition="right" className="link">
            <Button color="black">
              <i className="fas fa-address-card"></i>{" "}
            </Button>
            <Label basic color="black" pointing="left">
              DASHBOARD
            </Label>
          </Button>
        </Link>
      </li>
      
      <li>
        <Link onClick={() => logout(history)} to="/">
          <Button as="div" labelPosition="right" className="link">
            <Button color="black">
              <i className="fas fa-sign-out-alt" />{" "}
            </Button>
            <Label basic color="black" pointing="left">
              LOGOUT
            </Label>
          </Button>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <Link to="/petProfile">
          <Button as="div" labelPosition="right" className="link">
            <Button color="black">
              <i className="fas fa-dog" />
            </Button>
            <Label basic color="black" pointing="left">
              CUTIES
            </Label>
          </Button>
        </Link>
      </li> */}

      <li>
        <Link to="/auth">
          <Button as="div" labelPosition="right" className="link">
            <Button color="black">
              <i className="fas fa-paw"></i>
            </Button>
            <Label basic color="black" pointing="left">
              GET STARTED!
            </Label>
          </Button>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={navStatus === true ? "navbar" : "navbar removeNav"}>
      <Link to="/" className="logo">
        <i className="fas fa-dog" />
        {/* <img src="https://img.icons8.com/ios-filled/80/000000/animal-shelter.png" /> */}
        {/* <img src="https://img.icons8.com/dotty/80/000000/animal-shelter.png" /> */}
        {/* <img src="https://img.icons8.com/ios/50/000000/animal-shelter.png" alt="logo-img" /> */}

        <h1>TinDog</h1>
      </Link>
      <div className="links">{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}</div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
