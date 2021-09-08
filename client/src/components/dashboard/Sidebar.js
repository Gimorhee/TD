import React, { useState, useEffect } from "react";
import { Card, Select } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPetProfiles } from "../../actions/petProfile";

import Leaderboard from "./Sidebar/Leaderboard";
import UsersByLocation from "./Sidebar/UsersByLocation";

const Sidebar = ({ logout, history, auth, petProfile, getAllPetProfiles }) => {
  const [leaderboard, setLeaderBoard] = useState([]);
  const [type, setType] = useState("leaderboard");

  useEffect(() => {
    setLeaderBoard(petProfile.profiles.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1)));
  }, [petProfile]);

  useEffect(() => {
    getAllPetProfiles();
  }, [getAllPetProfiles]);

  const selectOptions = [
    { key: "leaderboard", value: "leaderboard", text: "leaderboard" },
    { key: "location", value: "location", text: "location" },
  ];

  const onChange = (e) => {
    setType(e.target.outerText);
  };

  return (
    <section className="sidebar">
      <Card className="outerCard scrollY">
        {/* GLOBAL BUTTONS */}
        <div className="btnContainer">
          <Link to="/" className="btn">
            <i className="fas fa-home homeBtn"></i>
          </Link>
          <span className="btn" onClick={() => logout(history)}>
            <i className="fas fa-sign-out-alt logoutBtn"></i>
          </span>
          <span className="btn">
            <i className="fas fa-envelope msgBtn"></i>
          </span>
        </div>

        <div className="headerContainer">
          <Select className="select" options={selectOptions} placeholder="LEADERBOARD" onChange={(e) => onChange(e)}></Select>
        </div>

        <section className="contentContainer">
          {type.toLowerCase() === "leaderboard" && <Leaderboard leaderboard={leaderboard} />}
          {type.toLowerCase() === "location" && <UsersByLocation />}
        </section>
      </Card>
    </section>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  petProfile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getAllPetProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  petProfile: state.petProfile,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPetProfiles })(withRouter(Sidebar));
// export default connect(null, { addExperience })(withRouter(AddExperience));
