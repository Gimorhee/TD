import React, { Fragment, useEffect } from "react";
import { Card, Divider } from "semantic-ui-react";
// import PropTypes from "prop-types";

const UserPetProfile = ({ user, profile }) => {
  useEffect(() => {
    profile && profile.characteristics.map((characteristic) => console.log(characteristic));
  }, []);

  return (
    <section className="userPetProfile">
      <Card className="outerCard">
        <div className="infoContainer">
          {profile !== null && (
            <Fragment>
              <div className="info">
                <div className="intro">
                  <h1>
                    {user && user.name} & {profile && profile.name}
                    <span>'s</span>
                  </h1>

                  <div className="avatar">
                    <img src={user && user.avatar} alt="dog-avatar-img" />
                  </div>

                  <div className="sns"></div>

                  <div className="bubblyBox">
                    <p className="description">{profile && profile.description}</p>
                  </div>
                </div>

                <Divider className="bigDivider" />

                {/* <div>BECAME MEMBER: {user && user.date}</div> */}
                <Card className="about">
                  <div className="detail">
                    <h3>AGE:</h3>
                    <p>{profile && profile.age}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>BREED: </h3>
                    <p>{profile && profile.breed}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>GENDER:</h3>
                    <p>{profile && profile.gender}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>LOCATION:</h3>
                    <p>{profile && profile.location}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <ul className="characteristics">
                    <h3>CHARACTERISTICS:</h3>
                    {profile && profile.characteristics.map((characteristic, i) => <li key={`characteristic-${i}`}>{characteristic}</li>)}
                  </ul>
                </Card>
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
