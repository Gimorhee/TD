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
    autoplay: true,
    autoplaySpeed: 6000,

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
      case 0:
        return "red";
      case 34:
        return "orange";
      case 68:
        return "yellow";
      case 100:
        return "green";
      default:
        break;
    }
  };

  // CALCULATING M/R - MIGHT NEED BETTER LOGIC
  const checkMatchRatio = (data1, data2, type) => {
    let mr = 0;
    let grade = "";

    const newLocation = JSON.parse(data2.mapInfo.context);
    let theLocation = "";

    newLocation.map((location) => {
      if (location.id.includes("place.")) {
        theLocation = location.text;
      }
    });

    if (data1.age === data2.age || data1.age === "Any") {
      mr += 0.34;
    }

    if (data1.gender === data2.gender || data1.gender === "Any") {
      mr += 0.34;
    }

    if (data1.location === theLocation || data1.location === "Any") {
      mr += 0.32;
    }

    if (mr === 1) {
      grade = "Perfect";
    } else if (mr === 0.68) {
      grade = "Good";
    } else if (mr === 0.34) {
      grade = "Okay";
    } else {
      grade = "Bad";
    }

    if (type === "grade") {
      return grade;
    } else {
      return mr;
    }
  };

  // useEffect(() => {
  //   profiles.map((profile) => {
  //     const data = JSON.parse(profile.mapInfo.context);

  //     data.map((info) => {
  //       info.id.includes("place.") && console.log(info.text);
  //     });
  //   });
  // }, [profiles]);

  //   useEffect(() => {
  //     let data = JSON.parse(
  //       `[{"id":"neighborhood.6923716659008760","text_en-US":"Fleetwood","text":"Fleetwood"},{"id":"postcode.12628497323799680","text_en-US":"V4N 0R5","text":"V4N 0R5"},{"id":"place.8937038287466560","wikidata":"Q390583","text_en-US":"Surrey","language_en-US":"en","text":"Surrey","language":"en"},{"id":"district.7275676332473720","wikidata":"Q1061069","text_en-US":"Metro Vancouver","language_en-US":"en","text":"Metro Vancouver","language":"en"},{"id":"region.9984400673322020","wikidata":"Q1974","short_code":"CA-BC","text_en-US":"British Columbia","language_en-US":"en","text":"British Columbia","language":"en"},{"id":"country.10278600750587150","wikidata":"Q16","short_code":"ca","text_en-US":"Canada","language_en-US":"en","text":"Canada","language":"en"}]`
  //     );

  //     data.map((info) => {
  //       info.id.includes("place.") && console.log(info.text);
  //     });
  //   }, []);

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
                        <p>Match Ratio: {checkMatchRatio(profile.lookingFor, p, "grade")}</p>
                        <Progress percent={checkMatchRatio(profile.lookingFor, p, "percent") * 100} color={progressColor(checkMatchRatio(profile.lookingFor, p) * 100)} />
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
