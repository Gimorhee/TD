import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import UserPetProfile from "../UserPetProfile";
import Spinner from "../../layout/Spinner";
import { getPetProfileById } from "../../../actions/petProfile";
import { connect } from "react-redux";

const Profile = ({ match, getPetProfileById, petProfile: { profile, loading }, auth }) => {
  useEffect(() => {
    getPetProfileById(match.params.id);
  }, [getPetProfileById]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="userProfile">
          <UserPetProfile user={profile.user} profile={profile} editable={false} />
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getPetProfileById: PropTypes.func.isRequired,
  petProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPetProfileById })(Profile);
