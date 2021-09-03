import React, { useState, useEffect } from "react";
import { Modal, Button } from "semantic-ui-react";

const MessageModal = ({ setOpen, open, auth, profile, sendMessage, setAlert, fromMsg }) => {
  const [text, setText] = useState("");

  const onSubmit = (profileId, text) => {
    if (!text || text == "") {
      setAlert("Message is required!");
    } else {
      sendMessage(profileId, { text });
      setText("");
      setOpen(false);
    }
  };

  return (
    <Modal closeIcon onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} id="sendMessageModal">
      <Modal.Header>SEND MESSAGE</Modal.Header>
      <Modal.Content>
        <div className="avatar">
          <img src={auth && auth.user && auth.user.avatar} alt="user-avatar" />
        </div>
        <div className="textInput">
          <p>
            <span>To.</span> {profile && profile.user.name} & {profile && profile.name}
          </p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} name="text" placeholder={`Say Woof!`}></textarea>
        </div>
      </Modal.Content>
      <Modal.Actions onClick={() => onSubmit(profile._id, text)}>
        <Button color="black">SEND</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MessageModal;
