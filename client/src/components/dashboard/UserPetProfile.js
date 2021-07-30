import React, { Fragment, useEffect, useState } from "react";
import { Card, Divider } from "semantic-ui-react";
// import PropTypes from "prop-types";

const UserPetProfile = ({ user, profile }) => {
  const [customTheme, customizeTheme] = useState({
    // DEFAULT THEME COLORS
    background: "#4C4C6D",
    btn: {
      border: "#4C4C6D",
      background: "rgba(190, 174, 226, 0.6)",
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
        {/* CUSTOMIZER */}
        <div className="customizer" onClick={() => setSetting(!openSetting)}>
          <div className="setting">
            <Fragment>
              <i className="fas fa-cog gear" style={{ color: setting }}></i>
            </Fragment>

            <div className={openSetting ? "settingBtn showColors" : "settingBtn"} style={{ background: btn.border }}>
              <div className="chosenColors" style={{ borderTop: `35px solid ${background}` }}></div>
            </div>

            <div className={openSetting ? "bgColors showColors openLeft" : "bgColors"}>
              {bgColors.map((bgColor, i) => (
                <div className={`color color${i + 1}`} style={{ background: bgColor }} key={`bgColor${i}`} onClick={() => customizeTheme({ ...customTheme, background: bgColor })}>
                  <i class="fas fa-check checkIcon"></i>
                </div>
              ))}
            </div>

            <div className={openSetting ? "btnColors showColors openBelow" : "btnColors"}>
              {btnColors.map((btnColor, i) => (
                <div
                  className={`color btnColor${i + 1}`}
                  style={{ background: btnColor.border }}
                  onClick={() => customizeTheme({ ...customTheme, btn: { border: btnColor.border, background: btnColor.background } })}
                >
                  <i class="fas fa-check checkIcon"></i>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="infoContainer">
          {profile !== null && (
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

                  <div className="sns"></div>

                  <div className="bubblyBox">
                    <p className="description">{profile && profile.description}</p>
                  </div>
                </div>

                <Divider className="bigDivider" />

                {/* <div>BECAME MEMBER: {user && user.date}</div> */}
                <Card className="about">
                  <div className="detail">
                    <h3>AGE:</h3>
                    <p>{profile && profile.age}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>BREED: </h3>
                    <p>{profile && profile.breed}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>GENDER:</h3>
                    <p>{profile && profile.gender}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <div className="detail">
                    <h3>LOCATION:</h3>
                    <p>{profile && profile.location}</p>
                  </div>
                  <Divider className="smallDivider" />

                  <ul className="characteristics">
                    <h3>CHARACTERISTICS:</h3>
                    {profile &&
                      profile.characteristics.map((characteristic, i) => (
                        <li style={{ borderColor: btn.border, background: btn.background, color: btn.border }} key={`characteristic-${i}`}>
                          {characteristic}
                        </li>
                      ))}
                  </ul>
                </Card>
              </div>
            </Fragment>
          )}

          {profile === null && <Fragment>NO PROFILES YET</Fragment>}

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
