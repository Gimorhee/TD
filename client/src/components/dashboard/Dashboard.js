import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// COMPONENTS
import Main from "./Main";
import UserPetProfile from "./UserPetProfile";
import Sidebar from "./Sidebar";
import Spinner from "../layout/Spinner";

// ACTIONS
import { getCurrentPetProfile } from "../../actions/petProfile";
import { logout } from "../../actions/auth";

const Dashboard = ({ auth: { user }, petProfile: { profile, loading }, getCurrentPetProfile, logout }) => {
  useEffect(() => {
    getCurrentPetProfile();
  }, []);

  return (
    <div className="dashboard">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <UserPetProfile user={user} profile={profile} />
          <Main />
          <Sidebar logout={logout} />
        </Fragment>
      )}
    </div>
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

export default connect(mapStateToProps, { getCurrentPetProfile, logout })(Dashboard);
