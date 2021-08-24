import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import UserPetProfile from "../UserPetProfile";
import Spinner from "../../layout/Spinner";
import UserPosts from "../Profile/UserPosts";
import Sidebar from "../Sidebar";
import { logout } from "../../../actions/auth";
import { getPost, likePost, unlikePost, deletePost, addPost } from "../../../actions/post";
import { connect } from "react-redux";
import { getPetProfileById } from "../../../actions/petProfile";

const Post = ({ post: { post, loading }, match, getProfileById, petProfile: { profile }, auth, logout, getPost, likePost, deletePost, addPost, getPetProfileById }) => {
  useEffect(() => {
    getPost(match.params.post_id);
    getPetProfileById(post && post.user._id);
  }, [getPost, getPetProfileById]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="Post">
          <UserPetProfile user={post && post.user._id} profile={profile} />
        </div>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPetProfileById: PropTypes.func.isRequired,
  petProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPost, likePost, unlikePost, deletePost, addPost, getPetProfileById })(Post);
