import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
// import PropTypes from "prop-types";

const UserPetProfile = ({ user, profile }) => {
  return (
    <section className="userPetProfile">
      <Card className="outerCard">
        <h1>DASHBOARD</h1>
        <p>WELCOME {user && user.name}!</p>
        {profile !== null ? <Fragment>O</Fragment> : <Fragment>X</Fragment>}
      </Card>
    </section>
  );
};

// UserPetProfile.propTypes = {
//     user: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired,
// };

export default UserPetProfile;
