import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentPetProfile } from "../../actions/petProfile";
import PropTypes from "prop-types";

const Dashboard = ({ auth, petProfile, getCurrentPetProfile }) => {
  useEffect(() => {
    getCurrentPetProfile();
  }, []);

  return <div>DASHBOARD</div>;
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
