import React from "react";
import iphoneImg from "../../assets/image/iphone6.png";
import dogImg1 from "../../assets/image/cutedog1.jpg";
import dogImg2 from "../../assets/image/dog-img.jpg";
import dogImg3 from "../../assets/image/cutedog.jpg";

import { Button } from "semantic-ui-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Landing = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <div className="landing">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="left">
          <h1>Meet new, beautiful and interesting dogs nearby</h1>
          <div className="buttons">
            <Button secondary size="huge" className="register-button">
              GET STARTED!
            </Button>
            <Button size="huge" className="hero-button">
              OUR CUTIES
            </Button>
          </div>
        </div>
        <div className="right">
          <img src={iphoneImg} alt="" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div>
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
        </div>
      </section>

      {/* TESITMONIAL/CAROUSEL SECTION */}
      <section className="testimonial">
        <Slider {...settings} className="carousel">
          <div>
            <h3>I no longer have to sniff other dogs for love. I've found the hottest Retriever on TinDog. Woof!</h3>
            <div className="image">
              <img src={dogImg1} alt="" />
            </div>
            <span>Benji, Vancouver</span>
          </div>
          <div>
            <h3>As you can see from the picture below, I am living the life!</h3>
            <div className="image">
              <img src={dogImg3} alt="" />
            </div>
            <span>Timon, Vancouver</span>
          </div>
          <div>
            <h3>Thanks to TinDog, I met true love of my life! Woof!</h3>
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

export default Landing;
