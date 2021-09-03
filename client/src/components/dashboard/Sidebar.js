import React, { Fragment, useState, useEffect } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPetProfiles } from "../../actions/petProfile";

const Sidebar = ({ logout, history, auth, petProfile, post, getAllPetProfiles }) => {
  const [leaderboard, setLeaderBoard] = useState([]);
  useEffect(() => {
    setLeaderBoard(petProfile.profiles.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1)));
  }, [petProfile]);

  useEffect(() => {
    getAllPetProfiles();
  }, [getAllPetProfiles]);

  return (
    <section className="sidebar">
      <Card className="outerCard scrollY">
        {/* GLOBAL BUTTONS */}
        <div className="btnContainer">
          <Link to="/" className="btn">
            <i className="fas fa-home homeBtn"></i>
          </Link>
          <span className="btn" onClick={() => logout(history)}>
            <i className="fas fa-sign-out-alt logoutBtn"></i>
          </span>
          <span className="btn">
            <i className="fas fa-envelope msgBtn"></i>
          </span>
        </div>

        <Card.Content className="headerContainer">
          <Card.Header>leaderboard</Card.Header>
        </Card.Content>

        <section className="contentContainer">
          {leaderboard.map((profile, i) => (
            <Link to={`/petProfile/${profile.user._id}`} className="user" key={`leaderboard-${i}`}>
              <div className="info">
                <span className="rank">{i + 1}.</span>

                <img src={profile.user.avatar} alt="user-avatar" />

                <p>
                  <span>{profile.user.name}</span> & <span>{profile.name}</span>
                </p>
              </div>
              <div className="likes">
                <Fragment>
                  {i === 0 && <i className="challenger fas fa-trophy"></i>}
                  {i === 1 && <i className="grandmaster fas fa-trophy"></i>}
                  {i === 2 && <i className="master fas fa-trophy"></i>}
                  <span>{profile.likes.length}</span> <i className="fas fa-heart like"></i>
                </Fragment>
              </div>
            </Link>
          ))}
        </section>
      </Card>
    </section>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  petProfile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getAllPetProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  petProfile: state.petProfile,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPetProfiles })(withRouter(Sidebar));
// export default connect(null, { addExperience })(withRouter(AddExperience));
