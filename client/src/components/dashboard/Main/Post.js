import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserPetProfile from "../UserPetProfile";
import Spinner from "../../layout/Spinner";
import Sidebar from "../Sidebar";
import { getPost, likePost, unlikePost, deletePost, addPost } from "../../../actions/post";
import { connect } from "react-redux";
import { getPetProfileById } from "../../../actions/petProfile";
import { Feed, Tab, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { generateRandomColor } from "../../../utils/functions";
import Moment from "react-moment";

const Post = ({ post: { post, loading }, match, getProfileById, petProfile: { profile }, auth, logout, getPost, likePost, unlikePost, deletePost, addPost, getPetProfileById }) => {
  const [randomColor, setRandomColor] = useState("");

  useEffect(() => {
    getPost(match.params.post_id);
    getPetProfileById(match.params.user_id);

    // Set a random color to share throught the page
    setRandomColor(generateRandomColor());
  }, [getPost, getPetProfileById]);

  const panes = [
    {
      menuItem: () => (
        <div className="ui attached tabular menu">
          <a className="active item" style={{ background: "#f9f9f9" }}>
            <i className="fas fa-envelope"></i> POST
          </a>
        </div>
      ),
      render: () => (
        <Fragment>
          <Tab.Pane>
            <Feed className="singlePost">
              <div className="container">
                <Feed className="posts">
                  <Feed.Event className="post" style={{ background: "#f9f9f9" }}>
                    <Feed.Label>
                      <Link to={`/user/${match.params.user_id}/post/${match.params.post_id}`}>
                        <img src={post && post.avatar} alt="user-avatar" />
                      </Link>
                      <div className="likeBtns">
                        <div className="like">
                          <i className="fas fa-thumbs-up" onClick={() => likePost(post && post._id)}></i>
                          {post && post.likes.length > 0 && <span>{post && post.likes.length}</span>}
                        </div>
                        <span className="divider">|</span>
                        <div className="unlike">
                          <i className="fas fa-thumbs-down" onClick={() => unlikePost(post._id)}></i>
                        </div>
                      </div>
                    </Feed.Label>

                    <Feed.Content>
                      <h4>
                        {post && post.name} & {post && post.pet}
                        <small>{<Moment fromNow>{post && post.date}</Moment>}</small>
                      </h4>

                      <Feed.Summary>
                        <p>{post && post.text}</p>
                      </Feed.Summary>
                    </Feed.Content>
                    <div className="usersAvatar">
                      {post && post.likes.length > 0 && (
                        <div className="usersLiked">
                          <p>Liked by..</p>
                          <div className="avatar">
                            {post.likes.map((like, i) => (
                              <img src={like.avatar} key={`avatar-${i}`} alt="user-avatar" />
                            ))}
                          </div>
                        </div>
                      )}
                      {post && post.comments.length > 0 && (
                        <div className="usersCommented">
                          <p>Commented by..</p>
                          <div className="avatar">
                            {post.comments.map((comment, i) => (
                              <img src={comment.avatar} key={`avatar-${i}`} alt="user-avatar" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* COMMENTS */}
                    <div className="comments">
                      {/* <header>{post && post.comments.length} Comment(s)</header> */}
                      <div className="container">
                        <form className="commentForm">
                          <div className="avatar">
                            <img src={auth && auth.user && auth.user.avatar} alt="user-avatar" />
                          </div>
                          <input type="text" placeholder="Add a comment" className="commentInput" />
                          <input type="submit" value="REPLY" className="replyBtn" />
                        </form>

                        <header>{post && post.comments.length} Comment(s)</header>

                        <section className={post && post.comments.length === 0 && "noOverflow"}>
                          {post &&
                            post.comments.length > 0 &&
                            post.comments.map((comment) => (
                              <div className="comment">
                                <div className="avatar">
                                  <img src={comment.avatar} alt="user-avatar" />
                                </div>
                                <div className="info">
                                  <p className="detail">
                                    {comment.name} & {comment.pet}
                                    <small>
                                      <Moment fromNow>{comment.date}</Moment>
                                    </small>
                                  </p>

                                  <p className="text">{comment.text}</p>
                                </div>
                              </div>
                            ))}

                          {post && post.comments.length === 0 && (
                            <div className="noComment">
                              <h3>There are no comments yet. </h3>
                            </div>
                          )}
                        </section>
                      </div>
                    </div>
                    {/* <div className="postBtns">{!auth.loading && auth.user._id === post.user && <i className="far fa-trash-alt" onClick={() => deletePost(post._id)}></i>}</div> */}
                  </Feed.Event>
                </Feed>
              </div>
            </Feed>
          </Tab.Pane>
          <section className="cta">
            <Link to="/dashboard">
              <i className="fas fa-chevron-left"></i>
              DASHBOARD
            </Link>
          </section>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="Post">
          <UserPetProfile user={profile && profile.user} profile={profile} editable={false} />
          <Tab panes={panes} className="userPostTab" />
          <Sidebar />
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
