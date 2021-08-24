import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Feed, Tab } from "semantic-ui-react";
import Moment from "react-moment";
import { generatePostColor } from "../../../utils/functions";

const UserPosts = ({ profile, auth, match, post, likePost, unlikePost, deletePost }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [readMore, setReadMore] = useState({
    status: false,
    index: null,
  });

  useEffect(() => {
    const filteredPosts = post.posts.filter((post) => post.user._id === match.params.id);
    setUserPosts(filteredPosts);
  }, [post.posts]);

  const panes = [
    {
      menuItem: () => (
        <div className="ui attached tabular menu">
          <a className="active item">
            <i className="fas fa-mail-bulk"></i> POSTS
          </a>
        </div>
      ),
      render: () => (
        <Fragment>
          <Tab.Pane>
            <div className="userPosts">
              <div className="container">
                {userPosts && userPosts.length > 0 ? (
                  <Feed className="posts">
                    {userPosts.map((post, i) => (
                      <Feed.Event
                        className="post"
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
                          <Link style={{ color: generatePostColor(i) }} to={`/post/${post._id}`}>
                            READ MORE
                          </Link>
                        </div>
                      </Feed.Event>
                    ))}
                  </Feed>
                ) : (
                  <div className="noPosts">
                    <h1>This user has no posts yet.</h1>
                  </div>
                )}
              </div>
            </div>
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
    // { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  ];

  return (
    <Fragment>
      <Tab panes={panes} className="userPostsTab" />
    </Fragment>
  );
};

export default UserPosts;
