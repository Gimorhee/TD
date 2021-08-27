import React, { Fragment, useEffect, useState } from "react";
import { Card, Divider } from "semantic-ui-react";
import PetProfileModal from "../modal/PetProfileModal";
// import PropTypes from "prop-types";

const UserPetProfile = ({ user, profile, openPetProfileModal, editable }) => {
  const [customTheme, customizeTheme] = useState({
    // DEFAULT THEME COLORS
    background: "#686d76",
    btn: {
      border: "#686d76",
      background: "rgba(221, 221,221 , 0.5)",
    },
    setting: "#fff",
  });

  const bgColors = ["#4C4C6D", "#709FB0", "#686d76", "#252525", "linear-gradient(to right, #15cda8, #12d3cf)", "#FFCB74"];

  const btnColors = [
    {
      border: "#4C4C6D",
      background: "rgba(190, 174, 226, 0.6)",
    },
    {
      border: "#709FB0",
      background: "rgba(205, 240, 234, 0.6)",
    },
    {
      border: "#686d76",
      background: "rgba(221, 221,221 , 0.6)",
    },
    {
      border: "#252525",
      background: "rgba(0,0,0, 0.2)",
    },
    {
      border: "#15cda8",
      background: "rgba(153, 243, 189, 0.3)",
    },
    {
      border: "#FFCB74",
      background: "rgba(250, 243, 221, 0.4)",
    },
  ];

  const [openSetting, setSetting] = useState(false);

  const { background, btn, setting } = customTheme;

  return (
    <section className="userPetProfile">
      <Card className="outerCard" style={{ background }}>
        {/* EDIT PROFILE MODAL */}
        {editable && (
          <PetProfileModal
            user={user}
            setting={setting}
            profile={profile}
            openPetProfileModal={openPetProfileModal}
            noProfileTrigger={
              <div className="noUserProfile">
                <div>
                  <h3>YOUR PET HAS NO PROFILE YET</h3>
                  <p>
                    Tell us how lovely your pet is <i className="fas fa-heart"></i>{" "}
                  </p>
                  <button onClick={() => openPetProfileModal()}>GET STARTED!</button>
                </div>
              </div>
            }
          />
        )}

        {/* CUSTOMIZER */}
        {editable && (
          <div className="customizer" onClick={() => setSetting(!openSetting)}>
            <div className="setting">
              <Fragment>
                <i className="fas fa-palette" style={{ color: setting }}></i>
              </Fragment>

              <div className={openSetting ? "settingBtn showColors" : "settingBtn"} style={{ background: btn.border }}>
                <div className="chosenColors" style={{ borderTop: `35px solid ${background}` }}></div>
              </div>

              <div className={openSetting ? "bgColors showColors openLeft" : "bgColors"}>
                {bgColors.map((bgColor, i) => (
                  <div className={`color color${i + 1}`} style={{ background: bgColor }} key={`bgColor${i}`} onClick={() => customizeTheme({ ...customTheme, background: bgColor })}>
                    <i className="fas fa-check checkIcon"></i>
                  </div>
                ))}
              </div>

              <div className={openSetting ? "btnColors showColors openBelow" : "btnColors"}>
                {btnColors.map((btnColor, i) => (
                  <div
                    className={`color btnColor${i + 1}`}
                    style={{ background: btnColor.border }}
                    onClick={() => customizeTheme({ ...customTheme, btn: { border: btnColor.border, background: btnColor.background } })}
                    key={`btnColor${i + 1}`}
                  >
                    <i className="fas fa-check checkIcon"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INFO */}
        <div className="infoContainer">
          {user && profile !== null && (
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

                  <div className="bubblyBox">
                    <p className="description">"{profile && profile.description}"</p>
                  </div>

                  <div className="sns">
                    {profile.social ? (
                      <Fragment>
                        {profile.social.youtube && (
                          <a href={`//${profile.social.youtube}`} target="_blank">
                            <i className="fab fa-youtube-square"></i>
                          </a>
                        )}
                        {profile.social.twitter && (
                          <a href={`//${profile.social.twitter}`} target="_blank">
                            <i className="fab fa-twitter-square"></i>
                          </a>
                        )}
                        {profile.social.facebook && (
                          <a href={`//${profile.social.facebook}`} target="_blank">
                            <i className="fab fa-facebook-square"></i>
                          </a>
                        )}
                        {profile.social.instagram && (
                          <a href={`//${profile.social.instagram}`} target="_blank">
                            <i className="fab fa-instagram-square"></i>
                          </a>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <p>You currently have no SNS setup.</p>
                      </Fragment>
                    )}
                  </div>
                </div>

                <Divider className="bigDivider" />

                {/* <div>BECAME MEMBER: {user && user.date}</div> */}
                <Card className="about">
                  <div className="detail">
                    <h3>AGE:</h3>
                    <p>{profile && profile.age}</p>
                  </div>
                  <Divider />

                  <div className="detail">
                    <h3>GENDER:</h3>
                    <p>{profile && profile.gender}</p>
                  </div>
                  <Divider />

                  <div className="detail">
                    <h3>LOCATION:</h3>
                    <p>{profile && profile.location}</p>
                  </div>
                  <Divider />

                  <ul className="characteristics">
                    <h3>CHARACTERISTICS:</h3>
                    {profile &&
                      profile.characteristics.map((characteristic, i) => (
                        <li style={{ borderColor: btn.border, background: btn.background, color: btn.border }} key={`characteristic-${i}`}>
                          {characteristic}
                        </li>
                      ))}
                  </ul>
                  <Divider />

                  {profile.lookingFor && (
                    <div className="lookingFor">
                      <h3>{profile.name} is looking for:</h3>

                      <div>
                        {profile.lookingFor.age && <span style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>age: {profile.lookingFor.age}</span>}
                        {profile.lookingFor.breed && <span style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>breed: {profile.lookingFor.breed}</span>}
                        {profile.lookingFor.gender && <span style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>gender: {profile.lookingFor.gender}</span>}
                        {profile.lookingFor.location && <span style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>location: {profile.lookingFor.location}</span>}
                      </div>

                      {profile.lookingFor.whatfor && (
                        <Fragment>
                          <h3>{profile.name} is here for:</h3>
                          <span style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>{profile.lookingFor.whatfor}</span>
                        </Fragment>
                      )}

                      {profile.lookingFor.description && (
                        <Fragment>
                          <h3>From {profile.name}:</h3>
                          <p style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>"{profile.lookingFor.description}"</p>
                        </Fragment>
                      )}

                      {/* <ul>
                        {profile.lookingFor.age && <li style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>{profile.lookingFor.age} age</li>}
                        {profile.lookingFor.breed && <li style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>{profile.lookingFor.breed} breed</li>}
                        {profile.lookingFor.gender && <li style={{ borderColor: btn.border, background: btn.background, color: btn.border }}>{profile.lookingFor.gender} gender</li>}
                      </ul> */}
                    </div>
                  )}
                </Card>
              </div>
            </Fragment>
          )}

          <div className={openSetting && "settingOverlay"} style={{ background: btn.background }} onClick={() => setSetting(false)}></div>
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
