import React, { useEffect } from "react";
import iphoneImg from "../../assets/image/iphone6.png";
import dogImg1 from "../../assets/image/cutedog1.jpg";
import dogImg2 from "../../assets/image/dog-img.jpg";
import dogImg3 from "../../assets/image/cutedog.jpg";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import LandingMap from "../map/LandingMap";

import { connect } from "react-redux";
import { getAllPetProfiles } from "../../actions/petProfile";

const Landing = ({ petProfile: { profiles }, getAllPetProfiles }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  const settings2 = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  useEffect(() => {
    getAllPetProfiles();
  }, []);

  //   console.log("HERE: ", petProfile.profiles);
  return (
    <div className="landing">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="left">
          <h1>Meet new, beautiful and interesting dogs nearby</h1>
          <div className="buttons">
            <Link to="/auth" secondary size="huge" className="register-button">
              GET STARTED!
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={iphoneImg} alt="" />
        </div>

        <a href="#landingMap">
          <i className="downArrow fas fa-chevron-down"></i>
        </a>
      </section>

      <div className="uiContainer">
        <LandingMap profiles={profiles} />

        {/* ABOUT SECTION */}
        <section className="about">
          <Slider {...settings2}>
            <div className="part">
              <i className="icon fas fa-check-circle fa-4x"></i>
              <h3>Easy to use</h3>
              <p>It's very easy that even your cuies could do it!</p>
              <Link to="/auth" secondary size="huge" className="register-button">
                GET STARTED!
              </Link>
            </div>

            <div className="part">
              <i className="icon fas fa-bullseye fa-4x"></i>
              <h3>Elite Clients</h3>
              <p>Checkout our beautiful and handsome dogs!</p>
              <Link to="/auth" secondary size="huge" className="register-button">
                GET STARTED!
              </Link>
            </div>

            <div className="part">
              <i className="icon fas fa-heart fa-4x"></i>
              <h3>You will love it</h3>
              <p>Find the true love of your pet's life!</p>
              <Link to="/auth" secondary size="huge" className="register-button">
                GET STARTED!
              </Link>
            </div>
          </Slider>
          {/* <div>
            <i className="icon fas fa-check-circle fa-4x"></i>
            <h3>Easy to use</h3>
            <p>It's very easy that even your cute dogs could do it!</p>
          </div>

          <div>
            <i className="icon fas fa-bullseye fa-4x"></i>
            <h3>Elite Clientele</h3>
            <p>Checkout our beautiful and handsome dogs!</p>
          </div>

          <div>
            <i className="icon fas fa-heart fa-4x"></i>
            <h3>Your dogs will love it</h3>
            <p>Find the true love of your dog's life!</p>
          </div> */}
        </section>
      </div>

      {/* TESITMONIAL/CAROUSEL SECTION */}
      <section className="testimonial">
        <Slider {...settings} className="carouse">
          <div className="carouselContainer">
            <h3>I no longer have to sniff other dogs for love. I've found the hottest Retriever on TinDog. Woof!</h3>
            <div className="image">
              <img src={dogImg1} alt="" />
            </div>
            <span>Benji, Vancouver</span>
          </div>
          <div className="carouselContainer">
            <h3>I am happy as woof!</h3>
            <div className="image">
              <img src={dogImg3} alt="" />
            </div>
            <span>Timon, Vancouver</span>
          </div>
          <div className="carouselContainer">
            <h3>Thanks to TinDog, I met true love of my life!</h3>
            <div className="image">
              <img src={dogImg2} alt="" />
            </div>
            <span>Simon, Coquitlam</span>
          </div>
        </Slider>
      </section>
    </div>
  );
};

Landing.propTypes = {
  petProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
});

export default connect(mapStateToProps, { getAllPetProfiles })(Landing);
