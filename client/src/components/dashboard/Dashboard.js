import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// COMPONENTS
import Main from "./Main";
import UserPetProfile from "./UserPetProfile";
import Sidebar from "./Sidebar";
import Spinner from "../layout/Spinner";

// ACTIONS
import { getCurrentPetProfile, openPetProfileModal } from "../../actions/petProfile";
import { logout } from "../../actions/auth";

const Dashboard = ({ auth: { user }, petProfile: { profile, loading }, getCurrentPetProfile, logout, openPetProfileModal }) => {
  useEffect(() => {
    getCurrentPetProfile();
  }, []);

  return (
    <Router>
      <div className="dashboard">
        {loading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <UserPetProfile user={user} profile={profile} openPetProfileModal={openPetProfileModal} />
            <Main />
            <Sidebar logout={logout} />
          </Fragment>
        )}
      </div>
    </Router>
  );
};

Dashboard.propTypes = {
  getCurrentPetProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  petProfile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  petProfile: state.petProfile,
});

export default connect(mapStateToProps, { getCurrentPetProfile, logout, openPetProfileModal })(Dashboard);
