import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Leaderboard = ({ leaderboard }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Leaderboard;
