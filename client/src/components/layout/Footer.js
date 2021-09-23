import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="header">
        <p>Meet new, beautiful and interesting dogs nearby</p>
        <Link to="/dashboard">GET STARTED!</Link>
      </div>
      <div className="parts">
        <div className="part">
          <i className="fas fa-map-marker-alt"></i>
          <span>8250 158st Surrey, BC V4N 0R5</span>
        </div>
        <a href="mailto:dongyunrhee@gmail.com" className="part">
          <i className="fas fa-envelope"></i>
          <span>dongyunrhee@gmail.com</span>
        </a>
        <a href="telto:6047887787" className="part">
          <i className="fas fa-phone-alt"></i>
          <span>+1 (604) 788 7787</span>
        </a>
        <div className="part">
          <p>© 2021 TinDog. All Right Reserved. Designed & Developed by Danny Rhee 🤟</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
