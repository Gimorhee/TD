import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Checkbox } from "semantic-ui-react";

const CreatePetProfile = ({ profile }) => {
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

  const { age, breed, characteristics, date, description, gender, location, lookingFor, name, social, user } = profile;

  useEffect(() => {
    if (profile) {
      setFormData({ age, breed, gender, characteristics, description, location, lookingFor, social, name });
    }

    // console.log("HI FROM CPP: ", user.avatar);
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
          <img src={user.avatar} alt="main-petfile-image" />
        </div>
        <div className="options">
          <div>
            {/* <input type="checkbox" name="gravatar" id="" className="gravaterCheckBtn" /> */}

            <label>Use Gravatar</label>
          </div>
          <button>Select File</button>
        </div>
      </div>

      <form action="" className="petProfileForm">
        <div className="inputContainer">
          <input type="text" name="name" placeholder="name" value={formData.name} onChange={(e) => onChange(e)} />
        </div>
        <div className="inputContainer">
          <input type="text" name="age" placeholder="age" value={formData.age} onChange={(e) => onChange(e)} />
        </div>
        <div className="inputContainer">
          <input type="text" name="breed" placeholder="breed" value={formData.breed} onChange={(e) => onChange(e)} />
        </div>
        <div className="inputContainer">
          <input type="text" name="gender" placeholder="gender" value={formData.gender} onChange={(e) => onChange(e)} />
        </div>
        <div className="inputContainer">
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={(e) => onChange(e)} />
        </div>
        <div className="inputContainer">
          <input type="text" name="characteristics" placeholder="Characteristics" value="" />
        </div>
        <div className="inputContainer">
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={(e) => onChange(e)} />
        </div>

        <h3>SOCIAL</h3>
        <div className="inputContainer social">
          <input type="text" name="yotube" placeholder="Yotube" value={formData.social.youtube} />
          <input type="text" name="twitter" placeholder="Twitter" value={formData.social.twitter} />
          <input type="text" name="facebook" placeholder="Facebook" value={formData.social.facebook} />
          <input type="text" name="instagram" placeholder="Instagram" value={formData.social.instagram} />
        </div>
      </form>
    </div>
  );
};

CreatePetProfile.propTypes = {};

export default CreatePetProfile;
