import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import dummyImg from "../../../assets/image/cutedog.jpg";
import { Divider, Progress } from "semantic-ui-react";

const AllPetProfiles = ({ getAllPetProfiles, petProfile }) => {
  const dummyData = [
    {
      user: "Danny",
      name: "Bori",
      age: "13",
      breed: "Maltese",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Bori is the cutest dog in the world!",
      location: "Surrey, BC",
      lookingFor: {
        location: "Surrey",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Friendship",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "3 days ago",
      matchRatio: 60,
    },
    {
      user: "Ezreal",
      name: "Blitzcrank",
      age: "7",
      breed: "Husky",
      gender: "Male",
      characteristics: ["Fast", "Furious", "Smart"],
      description: "Hi guys! we are Ezreal and Blitzcrank!",
      location: "Coquitlam, BC",
      lookingFor: {
        location: "Coquitlam",
        breed: "Husky",
        gender: "Female",
        age: "Any",
        whatfor: "Love",
        description: "I will grab you with my q!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "4 days ago",
      matchRatio: 20,
    },
    {
      user: "Xayah",
      name: "Rakan",
      age: "9",
      breed: "Sheperd",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Here comes Rakan!",
      location: "Vancouver, BC",
      lookingFor: {
        location: "Vancouver",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Walk-buddy",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "2 days ago",
      matchRatio: 0,
    },
    {
      user: "Danny",
      name: "Bori",
      age: "13",
      breed: "Maltese",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Bori is the cutest dog in the world!",
      location: "Surrey, BC",
      lookingFor: {
        location: "Surrey",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Friendship",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "3 days ago",
      matchRatio: 80,
    },
    {
      user: "Ezreal",
      name: "Blitzcrank",
      age: "7",
      breed: "Husky",
      gender: "Male",
      characteristics: ["Fast", "Furious", "Smart"],
      description: "Hi guys! we are Ezreal and Blitzcrank!",
      location: "Coquitlam, BC",
      lookingFor: {
        location: "Coquitlam",
        breed: "Husky",
        gender: "Female",
        age: "Any",
        whatfor: "Love",
        description: "I will grab you with my q!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "4 days ago",
      matchRatio: 100,
    },
    {
      user: "Xayah",
      name: "Rakan",
      age: "9",
      breed: "Sheperd",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Here comes Rakan!",
      location: "Vancouver, BC",
      lookingFor: {
        location: "Vancouver",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Walk-buddy",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "2 days ago",
      matchRatio: 40,
    },
    {
      user: "Danny",
      name: "Bori",
      age: "13",
      breed: "Maltese",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Bori is the cutest dog in the world!",
      location: "Surrey, BC",
      lookingFor: {
        location: "Surrey",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Friendship",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "3 days ago",
      matchRatio: 20,
    },
    {
      user: "Ezreal",
      name: "Blitzcrank",
      age: "7",
      breed: "Husky",
      gender: "Male",
      characteristics: ["Fast", "Furious", "Smart"],
      description: "Hi guys! we are Ezreal and Blitzcrank!",
      location: "Coquitlam, BC",
      lookingFor: {
        location: "Coquitlam",
        breed: "Husky",
        gender: "Female",
        age: "Any",
        whatfor: "Love",
        description: "I will grab you with my q!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "4 days ago",
      matchRatio: 40,
    },
    {
      user: "Xayah",
      name: "Rakan",
      age: "9",
      breed: "Sheperd",
      gender: "Male",
      characteristics: ["Adorable", "Cute", "Quite"],
      description: "Here comes Rakan!",
      location: "Vancouver, BC",
      lookingFor: {
        location: "Vancouver",
        breed: "Any",
        gender: "Any",
        age: "Any",
        whatfor: "Walk-buddy",
        description: "Hi Guys! Lets be friends!",
      },
      social: {
        youtube: "www.youtube.com",
        twitter: "www.twitter.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
      },
      date: "2 days ago",
      matchRatio: 80,
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />

    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  useEffect(() => {
    getAllPetProfiles();
  }, []);

  //   {
  //     user: "Danny",
  //     name: "Bori",
  //     age: "13",
  //     breed: "Maltese",
  //     gender: "Male",
  //     characteristics: ["Adorable", "Cute", "Quite"],
  //     description: "Bori is the cutest dog in the world!",
  //     location: "Surrey, BC",
  //     lookingFor: {
  //       location: "Surrey",
  //       breed: "Any",
  //       gender: "Any",
  //       age: "Any",
  //       whatfor: "Friendship",
  //       description: "Hi Guys! Lets be friends!",
  //     },
  //     social: {
  //       youtube: "www.youtube.com",
  //       twitter: "www.twitter.com",
  //       facebook: "www.facebook.com",
  //       instagram: "www.instagram.com",
  //     },
  //     date: "3 days ago",
  //   },

  const progressColor = (value) => {
    switch (value) {
      case 20:
        return "red";
      case 40:
        return "orange";
      case 60:
        return "yellow";
      case 80:
        return "olive";
      case 100:
        return "green";
      default:
        break;
    }
  };

  return (
    <div className="allProfiles">
      <div className="carousel">
        <Slider {...settings}>
          {dummyData &&
            dummyData.map((dummy, i) => (
              <div className="singleProfile" key={i}>
                <h4>
                  <i className="fas fa-user-circle"></i> {dummy.user}
                </h4>
                <div className="avatar">
                  <img src={dummyImg} alt="" />
                </div>
                <div className="info">
                  <h3>
                    <i className="fas fa-paw"></i> {dummy.name}
                  </h3>
                  <p>
                    {dummy.breed} | {dummy.gender} | {dummy.location}
                  </p>
                </div>

                <div className="characteristics">
                  {dummy.characteristics.map((characteristic, i) => (
                    <span key={i}>{characteristic}</span>
                  ))}
                </div>

                <Divider />

                <div className="matchRatio">
                  <p>Match Ratio: {dummy.matchRatio}%</p>
                  <Progress percent={dummy.matchRatio} color={progressColor(dummy.matchRatio)} />
                </div>

                <div className="bubblyBox">
                  <p className="description">{dummy.description}</p>
                </div>

                <Divider />

                <div className="sns">
                  <i class="fab fa-youtube"></i>
                  <i class="fab fa-twitter"></i>
                  <i class="fab fa-facebook"></i>
                  <i class="fab fa-instagram"></i>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

AllPetProfiles.propTypes = {};

export default AllPetProfiles;
