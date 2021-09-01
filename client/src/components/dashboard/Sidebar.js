import React, { Fragment, useState, useEffect } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AllPetProfiles from "./Main/AllPetProfiles";

const Sidebar = ({ logout, history, auth, petProfile, post }) => {
  const [leaderboard, setLeaderBoard] = useState([]);
  useEffect(() => {
    // petProfile.profiles.map((profile) => {
    //     arr.push({
    //         userId: profile.user._id,
    //         user: profile.user.name,
    //         pet: profile.name,

    //     })
    // })
    // arr = petProfile.profiles.sort((a, b) => (a.likes.length > b.likes.length ? 1 : -1));

    setLeaderBoard(petProfile.profiles.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1)));
    console.log("=> ", leaderboard);
  }, [petProfile]);

  return (
    <section className="sidebar">
      <Card className="outerCard">
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
          <Card.Header>Recent Posts</Card.Header>
        </Card.Content>

        <section className="contentContainer">
          {/* {petProfile.profiles.sort((a, b) => (a.likes.length > b.likes.length ? 1 : -1)).map()} */}
          {leaderboard.map((profile) => (
            <div>
              <h1>
                {profile.user.name} : {profile.likes.length}
              </h1>
            </div>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  petProfile: state.petProfile,
  post: state.post,
});

export default connect(mapStateToProps)(withRouter(Sidebar));
// export default connect(null, { addExperience })(withRouter(AddExperience));
