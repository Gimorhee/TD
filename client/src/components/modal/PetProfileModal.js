import React, { useState, Fragment } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import CreatePetProfile from "../profile-forms/CreatePetProfile";
// import PropTypes from "prop-types";

const PetProfileModal = ({ user, setting, profile }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="createProfileModal"
        trigger={
          <div className="editProfile">
            <i className="fas fa-user-edit" style={{ color: setting }}></i>
          </div>
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
