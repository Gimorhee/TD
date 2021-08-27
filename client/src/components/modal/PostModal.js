import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const PostModal = ({ auth, profile, addPost, open, setOpen, setAlert, getPosts }) => {
  const [text, setText] = useState("");

  const onSubmit = (text) => {
    if (!text) {
      setAlert(`What is on your mind ${profile && profile.user.name} & ${profile && profile.name}?`, "teal");
    } else {
      addPost({ text });
      setText("");
      setOpen(false);

      setTimeout(() => {
        getPosts();
      }, 250);
    }
  };

  return (
    <Modal closeIcon onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} id="createPostModal">
      <Modal.Header>CREATE POST</Modal.Header>
      <Modal.Content>
        <div className="avatar">
          <img src={auth && auth.user.avatar} alt="user-avatar" />
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
