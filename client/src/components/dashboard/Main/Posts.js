import React, { useEffect, useState, Fragment } from "react";
import Spinner from "../../layout/Spinner";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Posts = ({ auth, post: { post, posts, userPosts, postsById, loading }, getPosts, petProfile: { profile, profiles }, setAlert, likePost, unlikePost, deletePost }) => {
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState("All");

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const generateRandomColor = () => {
    const postColors = ["#FEEFD0", "#C0D3EE", "#DDB8B9", "#AFCFB6", "#94A2B7", "#82BEB7", "#FEEFD0"];

    let randomIndex = Math.floor(Math.random() * postColors.length);

    return postColors[randomIndex];
  };

  const handlePostModal = (profile) => {
    if (profile === null) {
      setAlert("Please create your profile first", "red");
    } else {
      setOpen(true);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="Posts">
          <div className="togglers">
            <div className={postType === "All" ? "toggler selected" : "toggler"} onClick={() => setPostType("All")}>
              <i className="fas fa-comments"></i>
              <span>ALL</span>
            </div>
            <div
              className={postType === "Yours" ? "toggler selected" : "toggler"}
              onClick={() => {
                setPostType("Yours");
                handlePostModal(profile);
              }}
            >
              <i className="fas fa-comment"></i>
              <span>YOURS</span>
            </div>
            <div className="toggler" onClick={() => handlePostModal(profile)}>
              <i className="fas fa-comment-medical"></i>
              <span>ADD</span>
            </div>

            <Modal closeIcon onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} id="createPostModal">
              <Modal.Header>CREATE POST</Modal.Header>
              <Modal.Content>
                <div className="avatar">
                  <img src={profile && profile.user.avatar} alt="user-avatar" />
                </div>
                <div className="textInput">
                  <p>
                    {profile && profile.user.name} & {profile && profile.name}
                  </p>
                  <textarea name="postText" placeholder={`What is on your mind ${profile && profile.user.name} & ${profile && profile.name}?`}></textarea>
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                  CREATE
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
          <Feed className="posts">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => (
                <Feed.Event className="post" key={post._id} style={{ background: generateRandomColor() }}>
                  <Feed.Label>
                    <Link to={`/petProfile/${post.user._id}`}>
                      <img src={post.avatar} alt="user-avatar" />
                    </Link>
                    <div className="likeBtns">
                      <div className="like">
                        <i className="fas fa-thumbs-up" onClick={() => likePost(post._id)}></i>
                        {post.likes.length > 0 && <span>{post.likes.length}</span>}
                      </div>
                      <span className="divider">|</span>
                      <div className="unlike">
                        <i className="fas fa-thumbs-down" onClick={() => unlikePost(post._id)}></i>
                      </div>
                    </div>
                  </Feed.Label>
                  <Feed.Content>
                    <p>
                      {post.name} & {post.pet}
                    </p>
                    <Feed.Summary>{post.text}</Feed.Summary>
                    <Feed.Date content={<Moment fromNow>{post.date}</Moment>} />
                  </Feed.Content>
                  <div className="usersAvatar">
                    {post.likes.length > 0 && (
                      <div className="usersLiked">
                        <p>Liked by..</p>
                        <div className="avatar">
                          {post.likes.map((like, i) => (
                            <img src={like.avatar} key={`avatar-${i}`} alt="user-avatar" />
                          ))}
                        </div>
                      </div>
                    )}
                    {post.comments.length > 0 && (
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
                  <div className="postBtns">{!auth.loading && auth.user._id === post.user._id && <i className="far fa-trash-alt" onClick={() => deletePost(post._id)}></i>}</div>
                </Feed.Event>
              ))}
          </Feed>
        </div>
      )}
    </Fragment>
  );
};

export default Posts;
