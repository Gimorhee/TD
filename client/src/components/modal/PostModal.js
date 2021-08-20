import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const PostModal = ({ profile, addPost, open, setOpen }) => {
  const [text, setText] = useState("");

  const onSubmit = (text) => {
    addPost({ text });
    setText("");
    setOpen(false);
  };

  return (
    <Modal closeIcon onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} id="createPostModal">
      <Modal.Header>CREATE POST</Modal.Header>
      <Modal.Content>
        <div className="avatar">
          <img src={profile && profile.user.avatar} alt="user-avatar" />
        </div>
        <div className="textInput">
          <p>
            {profile && profile.user.name} & {profile && profile.name}
          </p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} name="text" placeholder={`What is on your mind ${profile && profile.user.name} & ${profile && profile.name}?`}></textarea>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => onSubmit(text)}>
          CREATE
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PostModal;
