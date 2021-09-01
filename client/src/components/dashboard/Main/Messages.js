import React, { useEffect, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Messages = ({ auth, petProfile, deleteMessage, getPetProfileById }) => {
  useEffect(() => {
    getPetProfileById(auth.user._id);
    // alert("60f6294bf208224210b93b34");
  }, []);
  return (
    <div className="messages">
      <div style={{ width: "100%" }}>
        {petProfile && petProfile.profile && petProfile.profile.messages.length > 0 ? (
          <Fragment>
            {petProfile.profile.messages.map((message) => (
              <div className="message">
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
                  <i className="far fa-trash-alt" onClick={() => deleteMessage(message._id)}></i>
                </div>
              </div>
            ))}
          </Fragment>
        ) : (
          <div>No Messages Found</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
