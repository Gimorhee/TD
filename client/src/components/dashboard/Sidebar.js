import React, { Fragment } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import dogImg1 from "../../assets/image/cutedog.jpg";
import dogImg2 from "../../assets/image/dog-img.jpg";

// import PropTypes from "prop-types";

const Sidebar = ({ logout }) => {
  return (
    <section className="sidebar">
      <Card className="outerCard">
        {/* GLOBAL BUTTONS */}
        <div className="btnContainer">
          <Link to="/" className="btn">
            <i className="fas fa-home homeBtn"></i>
          </Link>
          <span className="btn" onClick={logout}>
            <i className="fas fa-sign-out-alt logoutBtn"></i>
          </span>
          <span className="btn">
            <i className="fas fa-envelope msgBtn"></i>
          </span>
        </div>

        {/* HEADER  */}
        <Card.Content className="headerContainer">
          <Card.Header>Recent Posts</Card.Header>
        </Card.Content>

        {/* CONTENT */}
        <Card.Content className="contentContainer">
          <Feed>
            <Feed.Event style={{ background: "#FEEFD0" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="1 days ago" />
                <Feed.Summary>What the woof?</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src={dogImg2} alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://cuteprofilepictures.weebly.com/uploads/2/1/8/5/21856578/2598313_orig.jpg" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img
                    src="https://media1.popsugar-assets.com/files/thumbor/zpzsOsdUEptenTm_qy6IUBOroto/0x0:1660x1660/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/29/927/n/44701584/0fd997f65db8abf1796548.77940914_/i/short-funny-pet-videos.png"
                    alt="user-avatar"
                  />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9W2_KnQG4R-BVSWNpTTJCueKLcjFbwhCsnT3KI92Yhx3B3ZdKrjdzcEeuVWR8y32PaxA&usqp=CAU" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#C0D3EE" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="1 days ago" />
                <Feed.Summary>Hello?</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <div className="avatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                  </div>
                  <img src="https://cuteprofilepictures.weebly.com/uploads/2/1/8/5/21856578/2598313_orig.jpg" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9W2_KnQG4R-BVSWNpTTJCueKLcjFbwhCsnT3KI92Yhx3B3ZdKrjdzcEeuVWR8y32PaxA&usqp=CAU" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img
                    src="https://media1.popsugar-assets.com/files/thumbor/zpzsOsdUEptenTm_qy6IUBOroto/0x0:1660x1660/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/29/927/n/44701584/0fd997f65db8abf1796548.77940914_/i/short-funny-pet-videos.png"
                    alt="user-avatar"
                  />
                </div>
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#DDB8B9" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="2 days ago" />
                <Feed.Summary>Hello???</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9W2_KnQG4R-BVSWNpTTJCueKLcjFbwhCsnT3KI92Yhx3B3ZdKrjdzcEeuVWR8y32PaxA&usqp=CAU" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#AFCFB6" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="3 days ago" />
                <Feed.Summary>Anyone here?</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#94A2B7" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="4 day ago" />
                <Feed.Summary>Feeling good!!!</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src={dogImg2} alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img
                    src="https://media1.popsugar-assets.com/files/thumbor/zpzsOsdUEptenTm_qy6IUBOroto/0x0:1660x1660/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/29/927/n/44701584/0fd997f65db8abf1796548.77940914_/i/short-funny-pet-videos.png"
                    alt="user-avatar"
                  />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9W2_KnQG4R-BVSWNpTTJCueKLcjFbwhCsnT3KI92Yhx3B3ZdKrjdzcEeuVWR8y32PaxA&usqp=CAU" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#82BEB7" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="6 days ago" />
                <Feed.Summary>Anyone wanna go for a walk?</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdwrtLxyENbwPYGwFqskbVNxuEqWX-xLctQ&usqp=CAU" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>

            <Feed.Event style={{ background: "#FEEFD0" }}>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="7 days ago" />
                <Feed.Summary>I am living the life!</Feed.Summary>
              </Feed.Content>
              <div className="usersCommented">
                <div className="avatar">
                  <img src={dogImg2} alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://cuteprofilepictures.weebly.com/uploads/2/1/8/5/21856578/2598313_orig.jpg" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img
                    src="https://media1.popsugar-assets.com/files/thumbor/zpzsOsdUEptenTm_qy6IUBOroto/0x0:1660x1660/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/29/927/n/44701584/0fd997f65db8abf1796548.77940914_/i/short-funny-pet-videos.png"
                    alt="user-avatar"
                  />
                </div>
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9W2_KnQG4R-BVSWNpTTJCueKLcjFbwhCsnT3KI92Yhx3B3ZdKrjdzcEeuVWR8y32PaxA&usqp=CAU" alt="user-avatar" />
                </div>
                <div className="avatar">
                  <img src="https://avatarfiles.alphacoders.com/273/thumb-1920-273316.png" alt="user-avatar" />
                </div>
              </div>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </section>
  );
};

// Posts.propTypes = {};

export default Sidebar;
