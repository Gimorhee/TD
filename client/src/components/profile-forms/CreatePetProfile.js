import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

const CreatePetProfile = ({ profile, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    gender: "",
    characteristics: [],
    description: "",
    location: "",
    lookingFor: {
      location: "",
      breed: "",
      gender: "",
      age: "",
      whatFor: "",
      description: "",
    },
    social: {
      youtube: "",
      twitter: "",
      instagram: "",
      facebook: "",
    },
  });

  const { name, age, breed, gender, characteristics, description, location, lookingFor, social } = formData;

  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age,
        breed: profile.breed,
        gender: profile.gender,
        characteristics: profile.characteristics,
        description: profile.descrription,
        location: profile.location,
        lookingFor: profile.lookingFor,
        social: profile.social,
        name: profile.name,
      });
    }
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="createPetProfile">
      {/* user, name, age, breed, gender, characteristics, description, location, lookingFor(location, breed, gender, age, whatfor, desription), social(youtube, twitter, facebook, instagram) */}
      <div className="imageContainer">
        <div className="mainImage">
          <img src={user && user.avatar} alt="main-petfile-image" />
        </div>
        <div className="options">
          <div className="optionContainer">
            {/* <input type="checkbox" name="gravatar" id="" className="gravaterCheckBtn" /> */}
            <button className="gravatarBtn">
              <i className="fas fa-check"></i>
              {/* <i class="fas fa-times"></i> */}
            </button>
            <label>Use Gravatar</label>
          </div>
          <div className="optionContainer">
            <button className="selectFileBtn">Select File</button>
          </div>
        </div>
      </div>

      <form className="petProfileForm">
        <div className="inputContainer">
          <label>NAME</label>
          <input type="text" name="name" value={formData.name} onChange={(e) => onChange(e)} />
        </div>
        <Divider />
        <div className="inputContainer">
          <label>AGE</label>
          <input type="text" name="age" value={formData.age} onChange={(e) => onChange(e)} />
        </div>
        <Divider />
        <div className="inputContainer">
          <label>BREED</label>
          <input type="text" name="breed" value={formData.breed} onChange={(e) => onChange(e)} />
        </div>
        <Divider />
        <div className="inputContainer">
          <label>GENDER</label>
          <input type="text" name="gender" value={formData.gender} onChange={(e) => onChange(e)} />
        </div>
        <Divider />
        <div className="inputContainer">
          <label>LOCATION</label>
          <input type="text" name="location" placeholder="Ex) Vancouver, BC" value={formData.location} onChange={(e) => onChange(e)} />
        </div>
        <Divider />
        <div className="inputContainer description">
          <label>DESCRIPTION</label>
          <textarea type="text" name="description" placeholder="Tell us more about your lovely pet!" value={formData.description} onChange={(e) => onChange(e)} />
        </div>
        {/* <div className="inputContainer">
          <label>CHARACTERISTICS</label>
          <input type="text" name="characteristics" placeholder="Characteristics" value="" />
        </div> */}

        <h3>
          SOCIAL <small>(OPTIONAL)</small>
        </h3>
        <div className="inputContainer social">
          <div>
            <i class="fab fa-youtube"></i>
            <input type="text" name="yotube" placeholder="Youtube" value={formData.social.youtube} />
          </div>
          <Divider />
          <div>
            <i class="fab fa-twitter"></i>
            <input type="text" name="twitter" placeholder="Twitter" value={formData.social.twitter} />
          </div>
          <Divider />
          <div>
            <i class="fab fa-facebook-square"></i>
            <input type="text" name="facebook" placeholder="Facebook" value={formData.social.facebook} />
          </div>
          <Divider />
          <div>
            <i class="fab fa-instagram"></i>
            <input type="text" name="instagram" placeholder="Instagram" value={formData.social.instagram} />
          </div>
        </div>

        <h3>YOUR PET'S TYPE</h3>
      </form>
    </div>
  );
};

CreatePetProfile.propTypes = {};

export default CreatePetProfile;
