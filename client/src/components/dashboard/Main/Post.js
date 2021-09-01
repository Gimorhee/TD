import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserPetProfile from "../UserPetProfile";
import Spinner from "../../layout/Spinner";
import Sidebar from "../Sidebar";
import { getPost, likePost, unlikePost, addComment, deleteComment } from "../../../actions/post";
import { getPetProfileById, sendMessage } from "../../../actions/petProfile";
import { setAlert } from "../../../actions/alert";
import { logout } from "../../../actions/auth";
import { Feed, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import MessageModal from "../../modal/MessageModal";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Post = ({
  post: { post, loading },
  match,
  getProfileById,
  petProfile: { profile },
  auth,
  logout,
  getPost,
  likePost,
  unlikePost,
  getPetProfileById,
  addComment,
  deleteComment,
  sendMessage,
  setAlert,
}) => {
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getPost(match.params.post_id);
    getPetProfileById(match.params.user_id);
  }, [getPost, getPetProfileById]);

  const onSubmit = (e) => {
    e.preventDefault();

    addComment(match.params.post_id, { text });
    setText("");
  };

  if (auth.user === null) {
    return <Redirect to="/" />;
  }

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
                          <i
                            className="fas fa-thumbs-up"
                            onClick={() => {
                              likePost(post && post._id);

                              setTimeout(() => {
                                getPost(match.params.post_id);
                              }, 200);
                            }}
                          ></i>
                          {post && post.likes.length > 0 && <span>{post && post.likes.length}</span>}
                        </div>
                        <span className="divider">|</span>
                        <div className="unlike">
                          <i
                            className="fas fa-thumbs-down"
                            onClick={() => {
                              unlikePost(post._id);

                              setTimeout(() => {
                                getPost(match.params.post_id);
                              }, 200);
                            }}
                          ></i>
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
                            {[...new Set(post.comments.map((comment) => comment.user))].map((user, i) => (
                              <img src={post.comments.find((c) => c.user === user).avatar} key={`avatar-${i}`} alt="user-avatar" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* COMMENTS */}
                    <div className="comments">
                      <div className="container">
                        <form className="commentForm" onSubmit={(e) => onSubmit(e)}>
                          <div className="avatar">
                            <img src={auth && auth.user && auth.user.avatar} alt="user-avatar" />
                          </div>
                          <input type="text" placeholder="Add a comment" name="comment" value={text} className="commentInput" onChange={(e) => setText(e.target.value)} />
                          <input type="submit" value="WOOF!" className="replyBtn" />
                        </form>

                        <header>{post && post.comments.length} Comment(s)</header>

                        <section className={post && post.comments.length === 0 && "noOverflow"}>
                          {post &&
                            post.comments.length > 0 &&
                            post.comments.map((comment, i) => (
                              <div className="comment" key={comment._id}>
                                <div className="avatar">
                                  <img src={comment.avatar} alt="user-avatar" />
                                </div>
                                <div className="info">
                                  <p className="detail">
                                    {comment.name} & {comment.pet}
                                    <small>
                                      <Moment fromNow>{comment.date}</Moment>
                                    </small>
                                    {auth && auth.user._id === comment.user && (
                                      <button className="deleteBtn" onClick={() => deleteComment(post._id, comment._id)}>
                                        <i className="far fa-trash-alt"></i>
                                      </button>
                                    )}
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
            <button className="messageBtn" onClick={() => setOpen(true)}>
              SEND MESSAGE <i className="far fa-envelope"></i>
            </button>

            <MessageModal setOpen={setOpen} open={open} auth={auth} profile={profile} sendMessage={sendMessage} setAlert={setAlert} />
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
          <Sidebar logout={logout} />
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
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPost, likePost, unlikePost, getPetProfileById, addComment, logout, deleteComment, sendMessage, setAlert })(Post);
