import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserPetProfile from "../UserPetProfile";
import Spinner from "../../layout/Spinner";
import UserPosts from "../Profile/UserPosts";
import Sidebar from "../Sidebar";
import { logout } from "../../../actions/auth";
import { getPetProfileById, sendMessage } from "../../../actions/petProfile";
import { getPosts, likePost, unlikePost, deletePost, addPost } from "../../../actions/post";
import { setAlert } from "../../../actions/alert";
import { connect } from "react-redux";

const Profile = ({ post, match, getPetProfileById, petProfile: { profile, loading }, auth, logout, getPosts, likePost, unlikePost, deletePost, addPost, sendMessage, setAlert }) => {
  useEffect(() => {
    getPetProfileById(match.params.id);
    getPosts();
  }, [getPetProfileById, getPosts, window.location.pathname]);

  const [mobileProfile, setMobileProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="userProfile">
          <div className={mobileProfile && "mobileUserPetProfile"}>
            <UserPetProfile user={profile && profile.user} profile={profile} editable={false} />

            <div className="mobileOverlay" onClick={() => setMobileProfile(false)}></div>
          </div>
          <UserPosts profile={profile} auth={auth} post={post} match={match} likePost={likePost} unlikePost={unlikePost} deletePost={deletePost} sendMessage={sendMessage} setAlert={setAlert} />

          <div className={mobileSidebar && "mobileSidebar"}>
            <Sidebar logout={logout} mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />

            <div className="mobileOverlay" onClick={() => setMobileSidebar(false)}></div>
          </div>

          {profile && (
            <div className="mobileCta">
              <div className="avatarProfile">
                <img src={profile.user.avatar} alt="mobileUserProfile" onClick={() => setMobileProfile(!mobileProfile)} />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getPetProfileById: PropTypes.func.isRequired,
  petProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPetProfileById, logout, getPosts, likePost, unlikePost, deletePost, addPost, sendMessage, setAlert })(Profile);
