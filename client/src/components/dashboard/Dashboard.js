import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  }, [getCurrentPetProfile]);

  const [mobileProfile, setMobileProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    if (!loading && profile === null) {
      setMobileProfile(true);
    } else if (!loading && profile !== null) {
      setMobileProfile(false);
    }
  }, [profile]);

  return (
    <div className="dashboard">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={mobileProfile && "mobileUserPetProfile"}>
            <UserPetProfile user={user} profile={profile} openPetProfileModal={openPetProfileModal} editable={true} />

            <div className="mobileOverlay" onClick={() => setMobileProfile(false)}></div>
          </div>
          <Main />

          <div className={mobileSidebar && "mobileSidebar"}>
            <Sidebar logout={logout} mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />

            <div className="mobileOverlay" onClick={() => setMobileSidebar(false)}></div>
          </div>

          {profile === null && (
            <div className={mobileProfile && "mobileUserPetProfile"}>
              <div className="noProfileOverlay">
                <h1>
                  <i className="fas fa-hand-point-left"></i>
                  <span>Start building your profile and get started!</span>
                </h1>
              </div>
            </div>
          )}

          {user && (
            <div className="mobileCta">
              <div className="avatarProfile">
                <img src={user.avatar} alt="mobileUserProfile" onClick={() => setMobileProfile(!mobileProfile)} />
              </div>
            </div>
          )}
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

export default connect(mapStateToProps, { getCurrentPetProfile, logout, openPetProfileModal })(Dashboard);
