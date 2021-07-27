import React from "react";
import iphoneImg from "../../assets/image/iphone6.png";
import { Button, Icon, Label } from "semantic-ui-react";

const Landing = () => {
  return (
    <div className="landing">
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
      <section className="about">
        <div>
          <i class="icon fas fa-check-circle fa-4x"></i>
          <h3>Easy to use</h3>
          <p>It's very easy that even your cute dogs could do it!</p>
        </div>

        <div>
          <i class="icon fas fa-bullseye fa-4x"></i>
          <h3>Elite Clientele</h3>
          <p>Checkout our beautiful and handsome dogs!</p>
        </div>

        <div>
          <i class="icon fas fa-heart fa-4x"></i>
          <h3>Your dogs will love it</h3>
          <p>Find the true love of your dog's life!</p>
        </div>
      </section>
      <section className="testimonial">testimonial</section>
    </div>
  );
};

export default Landing;
