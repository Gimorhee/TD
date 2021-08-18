import React, { useEffect, useState, Fragment } from "react";
import Spinner from "../../layout/Spinner";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Posts = ({ post: { post, posts, userPosts, postsById, loading }, getPosts, petProfile: { profile, profiles } }) => {
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
            <div className={postType === "Yours" ? "toggler selected" : "toggler"} onClick={() => setPostType("Yours")}>
              <i className="fas fa-comment"></i>
              <span>YOURS</span>
            </div>

            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <div className="toggler">
                  <i className="fas fa-comment-medical"></i>
                  <span>ADD</span>
                </div>
              }
            >
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content image>
                <Image size="medium" src="/images/avatar/large/rachel.png" wrapped />
                <Modal.Description>
                  <Header>Default Profile Image</Header>
                  <p>We've found the following gravatar image associated with your e-mail address.</p>
                  <p>Is it okay to use this photo?</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                  Nope
                </Button>
                <Button content="Yep, that's me" labelPosition="right" icon="checkmark" onClick={() => setOpen(false)} positive />
              </Modal.Actions>
              {/* <div className="postForm">
            <div className="profile">
              <div className="avatar">
                <img src={profile.user.avatar} alt="user-avatar" />
              </div>
              <div className="info">
                <p>
                  {profile.user.name} & {profile.name}
                </p>
              </div>
            </div>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <textarea name="text" placeholder="Create a post" required></textarea>
              <input type="submit" className="postBtn" value="Submit" />
            </form>
          </div> */}
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
                  </Feed.Label>
                  <Feed.Content>
                    <p>
                      {post.name} & {post.pet}
                    </p>
                    <Feed.Summary>{post.text}</Feed.Summary>
                    <Feed.Date content={<Moment fromNow>{post.date}</Moment>} />
                  </Feed.Content>
                  {post.likes.length > 0 && (
                    <div className="usersLiked">
                      <p>Liked by..</p>
                      {post.likes.map((like, i) => (
                        <div className="avatar" key={`avatar-${i}`}>
                          <img src={like.avatar} alt="user-avatar" />
                        </div>
                      ))}
                    </div>
                  )}
                </Feed.Event>
              ))}
          </Feed>
        </div>
      )}
    </Fragment>
  );
};

export default Posts;
