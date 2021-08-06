import React, { useState, Fragment, useEffect } from "react";
import { Button, Divider, Header, Image, Modal } from "semantic-ui-react";
import CreatePetProfile from "../profile-forms/CreatePetProfile";
// import PropTypes from "prop-types";

const PetProfileModal = ({ user, setting, profile, noProfileTrigger }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(profile);
  }, []);

  return (
    <Fragment>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="createProfileModal"
        trigger={
          profile !== null ? (
            <div className="editProfile">
              <i className="fas fa-user-edit" style={{ color: setting }}></i>
            </div>
          ) : (
            noProfileTrigger
          )
        }
      >
        <Modal.Header>CREATE & UPDATE PROFILE</Modal.Header>
        <Modal.Content image>
          {/* <Image size="medium" src={user && user.avatar} wrapped /> */}
          <CreatePetProfile profile={profile} user={user} />
        </Modal.Content>
        <Modal.Actions>
          <Button content="CREATE/UPDATE" labelPosition="right" icon="checkmark" onClick={() => setOpen(false)} positive />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

// PetProfileModal.propTypes = {};

export default PetProfileModal;
