import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "semantic-ui-react";
import CreatePetProfile from "../profile-forms/CreatePetProfile";
// import PropTypes from "prop-types";

const PetProfileModal = ({ user, setting, profile, noProfileTrigger, openPetProfileModal }) => {
  const [open, setOpen] = useState(false);

  //   useEffect(() => {
  //     openPetProfileModal();
  //   }, []);

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
            <div className="editProfile" onClick={() => openPetProfileModal()}>
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
          <CreatePetProfile profile={profile} user={user} setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

// PetProfileModal.propTypes = {};

export default PetProfileModal;
