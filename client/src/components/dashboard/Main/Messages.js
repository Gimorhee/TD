import React, { useEffect, Fragment, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { generatePostColor } from "../../../utils/functions";
import { Modal } from "semantic-ui-react";

const Messages = ({ auth, petProfile, deleteMessage, getPetProfileById, sendMessage, setAlert }) => {
  useEffect(() => {
    getPetProfileById(auth.user._id);
  }, []);

  return (
    <div className="messages">
      <div style={{ width: "100%" }}>
        {petProfile && petProfile.profile && petProfile.profile.messages.length > 0 ? (
          <Fragment>
            {petProfile.profile.messages.map((message, i) => (
              <div className="message" key={message._id} style={{ background: generatePostColor(i) }}>
                <div className="avatar">
                  <Link to={`/petProfile/${message.user}`}>
                    <img src={message.avatar} alt="user-avatar" />
                  </Link>
                </div>
                <div className="userInfo">
                  <h4>
                    <Link to={`/petProfile/${message.user}`}>
                      {message.name} & {message.pet}
                    </Link>
                  </h4>
                  <p>
                    <span>
                      <Moment format="YYYY-MM-DD">{message.date}</Moment>
                    </span>
                    <small>
                      <Moment fromNow>{message.date}</Moment>
                    </small>
                  </p>
                </div>
                <div className="content">
                  <p>{message.text}</p>
                </div>
                <div className="cta">
                  <Link to={`/petProfile/${message.user}`}>
                    <i className="far fa-address-card"></i>
                  </Link>
                  {/* <i className="fas fa-reply" onClick={() => setOpen(true)}></i> */}
                  <i className="far fa-trash-alt" onClick={() => deleteMessage(message._id)}></i>
                </div>
              </div>
            ))}
          </Fragment>
        ) : (
          <div className="noMessages">
            <h1>You have not received any messages yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
