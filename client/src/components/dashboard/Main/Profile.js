import React, { Fragment, useEffect } from "react";
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
  }, [getPetProfileById, getPosts]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="userProfile">
          <UserPetProfile user={profile && profile.user} profile={profile} editable={false} />
          <UserPosts profile={profile} auth={auth} post={post} match={match} likePost={likePost} unlikePost={unlikePost} deletePost={deletePost} sendMessage={sendMessage} setAlert={setAlert} />
          <Sidebar logout={logout} />
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
