import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
// import PropTypes from "prop-types";

const UserPetProfile = ({ user, profile }) => {
  return (
    <section className="userPetProfile">
      <Card className="outerCard">
        <div className="infoContainer">
          {profile !== null && (
            <Fragment>
              {" "}
              <h3>
                <span>{user && user.name}</span> & <span>{profile && profile.name}</span>'s Profile
              </h3>
              <div className="info">
                <div className="avatar">
                  <img src={user && user.avatar} alt="dog-avatar-img" />
                </div>
                <div>BECAME MEMBER: {user && user.date}</div>
                <div>AGE: {profile && profile.age}</div>
                <div>BREED: {profile && profile.breed}</div>
                <div>GENDER: {profile && profile.gender}</div>
                <div>DESCRIPTION: {profile && profile.description}</div>
                <div>LOCATION: {profile && profile.location}</div>
              </div>
            </Fragment>
          )}

          {profile === null && <Fragment>NO PROFILES YET</Fragment>}
        </div>
      </Card>
    </section>
  );
};

// UserPetProfile.propTypes = {
//     user: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired,
// };

export default UserPetProfile;
