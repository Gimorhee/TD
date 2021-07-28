import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

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
            <Button as="div" labelPosition="right" className="link">
              <Button color="black">
                <i className="fas fa-dog" />
              </Button>
              <Label basic color="black" pointing="left">
                OUR CUTIES
              </Label>
            </Button>
          </li>

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
      </div>
    </nav>
  );
};

export default Navbar;
