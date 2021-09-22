import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Divider, Progress } from "semantic-ui-react";
import Spinner from "../../layout/Spinner";
import { Link } from "react-router-dom";

const AllPetProfiles = ({ auth, likePetProfile, unlikePetProfile, petProfile: { profile, profiles } }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 499,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const progressColor = (value) => {
    switch (value) {
      case 25:
        return "red";
      case 50:
        return "orange";
      case 75:
        return "yellow";
      case 100:
        return "green";
      default:
        break;
    }
  };

  // CALCULATING M/R - MIGHT NEED BETTER LOGIC
  const checkMatchRatio = (data1, data2) => {
    let mr = 0;

    if (data1.age === data2.age || data1.age === "Any") {
      mr += 0.25;
    }

    if (data1.breed === data2.breed || data1.breed === "Any") {
      mr += 0.25;
    }

    if (data1.gender === data2.gender || data1.gender === "Any") {
      mr += 0.25;
    }

    if (data1.location === data2.location || data1.location === "Any") {
      mr += 0.25;
    }

    return mr;
  };

  return (
    <Fragment>
      {profiles.loading ? (
        <Spinner />
      ) : (
        <div className="allProfiles">
          <div className="carousel">
            <Slider {...settings}>
              {profiles &&
                profiles.map((p, i) => (
                  <div className="singleProfile" key={`petProfile-${i}`}>
                    <div className="like">
                      {[...new Set(p.likes.map((like) => like.user))].includes(auth && auth.user && auth.user._id) === true ? (
                        <Fragment>
                          <span className={p.likes.length === 0 && "dontShow"}>{p.likes.length}</span>
                          <i className="fas fa-heart liked" onClick={() => unlikePetProfile(p._id)}></i>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <span className={p.likes.length === 0 && "dontShow"}>{p.likes.length}</span>
                          <i className="far fa-heart" onClick={() => likePetProfile(p._id)}></i>
                        </Fragment>
                      )}
                    </div>
                    <Link to={`/petProfile/${p.user._id}`}>
                      <h4>
                        <i className="fas fa-user-circle"></i> {p.user.name}
                      </h4>
                    </Link>

                    <div className="avatar">
                      <Link to={`/petProfile/${p.user._id}`}>
                        <img src={p.user.avatar} alt="" />
                      </Link>
                    </div>

                    <div className="info">
                      <Link to={`/petProfile/${p.user._id}`}>
                        <h3>
                          <i className="fas fa-paw"></i> {p.name}{" "}
                          <small>
                            {p.gender} | {p.age} {p.age <= 1 ? "yr" : "yrs"}
                          </small>
                        </h3>
                      </Link>
                      <p className="userLocation">{p.location}</p>
                    </div>

                    <div className="characteristics">
                      {p.characteristics.map((characteristic, i) => (
                        <span key={`characteristic-${i}`}>{characteristic}</span>
                      ))}
                    </div>

                    <Divider />

                    {profile && profile.lookingFor ? (
                      <div className="matchRatio">
                        <p>Match Ratio: {checkMatchRatio(profile.lookingFor, p) * 100}%</p>
                        <Progress percent={checkMatchRatio(profile.lookingFor, p) * 100} color={progressColor(checkMatchRatio(profile.lookingFor, p) * 100)} />
                      </div>
                    ) : (
                      <div className="matchRatio">
                        <p>Match Ratio: 0%</p>
                        <p style={{ fontSize: 11.5, margin: 0 }}>
                          <i>(Update your pet's type to see match ratio)</i>
                        </p>
                      </div>
                    )}

                    <div className="bubblyBox">
                      <p className="description">{p.description}</p>
                    </div>

                    <Divider />

                    {p.social ? (
                      <div className="sns">
                        {p.social.youtube && (
                          <a href={`https://${p.social.youtube}`}>
                            <i className="fab fa-youtube"></i>
                          </a>
                        )}
                        {p.social.twitter && (
                          <a href={`https://${p.social.twitter}`}>
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {p.social.facebook && (
                          <a href={`https://${p.social.facebook}`}>
                            <i className="fab fa-facebook"></i>
                          </a>
                        )}
                        {p.social.instagram && (
                          <a href={`https://${p.social.instagram}`}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="noSNS">
                        <i>No Social Network Info for this user yet.</i>
                      </div>
                    )}
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      )}
    </Fragment>
  );
};

AllPetProfiles.propTypes = {};

export default AllPetProfiles;
