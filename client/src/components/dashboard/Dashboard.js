import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentPetProfile } from "../../actions/petProfile";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import UserPetProfile from "./UserPetProfile";
import PetProfiles from "./PetProfiles";
import Posts from "./Posts";

const Dashboard = ({ auth: { user }, petProfile: { profile, loading }, getCurrentPetProfile }) => {
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
          <PetProfiles />
          <Posts />
          {/* <h1>DASHBOARD</h1>
          <p>WELCOME {user && user.name}!</p>
          {profile !== null ? <Fragment>O</Fragment> : <Fragment>X</Fragment>} */}
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentPetProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  petProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  petProfile: state.petProfile,
});

export default connect(mapStateToProps, { getCurrentPetProfile })(Dashboard);
