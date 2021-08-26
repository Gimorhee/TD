import React, { useEffect, useState, Fragment } from "react";
import Spinner from "../../layout/Spinner";
import { Feed, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PostModal from "../../modal/PostModal";
import { generatePostColor } from "../../../utils/functions";

const Posts = ({ auth, post: { post, posts, loading }, getPosts, petProfile: { profile, profiles }, setAlert, likePost, unlikePost, deletePost, addPost }) => {
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState("All");
  const [readMore, setReadMore] = useState({
    status: false,
    index: null,
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handlePostModal = (profile) => {
    if (profile === null) {
      setAlert("Please create your profile first", "red");
    } else {
      setOpen(true);
    }
  };

  let postToShow = [...posts];

  if (postType !== "All") {
    postToShow = [...posts].filter((post) => post.user._id === auth.user._id);
  }

  const handleYoursPosts = () => {
    postToShow = [...posts].filter((post) => post.user._id === auth.user._id);

    if (postToShow.length < 1) {
      setAlert("You have not created any posts yet :(", "red");
    } else {
      setPostType("Yours");
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
            <div className={postType === "Yours" ? "toggler selected" : "toggler"} onClick={handleYoursPosts}>
              <i className="fas fa-comment"></i>
              <span>YOURS</span>
            </div>
            <div className="toggler" onClick={() => handlePostModal(profile)}>
              <i className="fas fa-comment-medical"></i>
              <span>ADD</span>
            </div>

            <PostModal profile={profile} addPost={addPost} open={open} setOpen={setOpen} setAlert={setAlert} getPosts={getPosts} />
          </div>
          <Feed className="posts">
            {postToShow &&
              postToShow.length > 0 &&
              postToShow.map((post, i) => (
                <Feed.Event
                  className="post"
                  key={post._id}
                  style={{ background: generatePostColor(i) }}
                  onClick={() => {
                    setReadMore({ status: !readMore.status, index: i });
                  }}
                  onMouseEnter={() => {
                    setReadMore({ status: true, index: i });
                  }}
                  onMouseLeave={() => {
                    setReadMore({ status: false, index: null });
                  }}
                >
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
                    <Feed.Summary>
                      <p>{post.text}</p>
                    </Feed.Summary>
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
                  <div className={readMore.status && readMore.index === i ? "postLink showLink" : "postLink"}>
                    <Link style={{ color: generatePostColor(i) }} to={`user/${post.user._id}/post/${post._id}`} className={`color${generatePostColor(i).toString().split("#")[1]}`}>
                      READ MORE
                    </Link>
                  </div>
                </Feed.Event>
              ))}
          </Feed>
        </div>
      )}
    </Fragment>
  );
};

export default Posts;
