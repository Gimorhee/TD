import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentPetProfile } from "../../actions/petProfile";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Dashboard = ({ auth, petProfile: { profile, loading }, getCurrentPetProfile }) => {
  useEffect(() => {
    getCurrentPetProfile();
  }, []);

  return <div>{loading && profile === null ? <Spinner /> : <Fragment>DASHBOARD</Fragment>}</div>;
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
