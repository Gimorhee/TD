import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Divider, Modal, Button } from "semantic-ui-react";
import { putPetProfile, openPetProfileModal, putLookingFor, deleteAccount } from "../../actions/petProfile";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const CreatePetProfile = ({ profile, user, setOpen, putPetProfile, putLookingFor, deleteAccount, setAlert, modalStatus, openPetProfileModal }) => {
  // GENERAL FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    characteristics: [],
    description: "",
    location: "",
    youtube: "",
    twitter: "",
    instagram: "",
    facebook: "",
    //

    forLocation: "Any",
    forGender: "Any",
    forAge: "Any",
    forWhatfor: "Any",
    forDescription: "",
  });

  const { name, age, gender, characteristics, description, location, lookingFor, youtube, twitter, instagram, facebook, forLocation, forGender, forAge, forWhatfor, forDescription } = formData;

  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age,
        gender: profile.gender,
        characteristics: profile.characteristics,
        description: profile.description,
        location: profile.location,
        // lookingFor: profile.lookingFor,
        youtube: profile && profile.social && profile.social.youtube,
        twitter: profile && profile.social && profile.social.twitter,
        instagram: profile && profile.social && profile.social.instagram,
        facebook: profile && profile.social && profile.social.facebook,
        name: profile.name,
        forLocation: profile && profile.lookingFor && profile.lookingFor.location,
        forGender: profile && profile.lookingFor && profile.lookingFor.gender,
        forAge: profile && profile.lookingFor && profile.lookingFor.age,
        forWhatfor: profile && profile.lookingFor && profile.lookingFor.whatfor,
        forDescription: profile && profile.lookingFor && profile.lookingFor.description,
      });
    }
  }, [profile]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const newFormData = {
      name,
      age,
      gender,
      characteristics,
      description,
      location,
      lookingFor,
      youtube,
      twitter,
      instagram,
      facebook,
      forLocation,
      forGender,
      forAge,
      forWhatfor,
      forDescription,
    };

    if (name === "" || age === "" || gender === "" || description === "") {
      setAlert("Please fill all the required fields", "red");
    }

    if (characteristics.length < 3) {
      //   putPetProfile(newFormData);
      setAlert("Please select 3 characteristics", "red");
    }

    if (characteristics.length === 3) {
      putPetProfile(newFormData);
    }
  };

  const petCharacteristics = [
    "Active",
    "Adorable",
    "Agile",
    "Attractive",
    "Aware",
    "Caring",
    "Companionable",
    "Crazy",
    "Cuddly",
    "Cute",
    "Energetic",
    "Faituful",
    "Fluffy",
    "Friendly",
    "Furious",
    "Handsome",
    "Honest",
    "Hostile",
    "Lazy",
    "Loving",
    "Loyal",
    "Patient",
    "Sensitive",
    "Silly",
    "Smart",
    "Snoopy",
    "Sporty",
    "Strong",
    "Quite",
  ];

  const selectCharacteristic = (characteristic) => {
    if (!characteristics.includes(characteristic)) {
      if (characteristics.length < 3) {
        setFormData({
          ...formData,
          characteristics: [...characteristics, characteristic],
        });
      } else {
        setAlert("You can only select 3 characterstics", "red");
      }
    } else {
      const newCharacteristics = characteristics.filter((c) => c !== characteristic).sort();

      setFormData({
        ...formData,
        characteristics: newCharacteristics,
      });
    }
  };

  const checkIfSelected = (characteristic) => {
    if (characteristics.includes(characteristic)) {
      return "selected";
    }
  };

  useEffect(() => {
    if (modalStatus) {
      setOpen(false);
    }
  }, [modalStatus]);

  return (
    <Fragment>
      <div className="createPetProfile">
        <div className="imageContainer">
          <div className="mainImage">
            <img src={user && user.avatar} alt="main-petfile-image" />
          </div>
          <div className="options">
            {/* TODO: TOGGLE GRAVATAR IMAGE & UPLOAD IMAGE (MAYBE)  */}
            <p>
              Please use <a href="https://en.gravatar.com/">Gravatar</a> email to set the profile image.
            </p>
          </div>
        </div>

        <form className="petProfileForm">
          <div className="inputContainer">
            <label>
              NAME <span>*</span>
            </label>
            <input type="text" name="name" placeholder="Your pet's name" value={formData.name} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer">
            <label>
              AGE <span>*</span>
            </label>
            <input type="number" name="age" min="1" value={formData.age} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer">
            <label>
              GENDER <span>*</span>
            </label>
            <select name="gender" value={formData.gender} onChange={(e) => onChange(e)}>
              <option value="" disabled selected className="default"></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div></div>
          </div>
          <Divider />
          <div className="inputContainer">
            <label>
              LOCATION <span>*</span>
            </label>
            <select name="location" value={formData.location} onChange={(e) => onChange(e)}>
              <option value="" disabled selected className="default"></option>
              <option value="Abbotsford">Abbotsford</option>
              <option value="Burnaby">Burnaby</option>
              <option value="Chilliwack">Chilliwack</option>
              <option value="Coquitlam">Coquitlam</option>
              <option value="Delta">Delta</option>
              <option value="Langley">Langley</option>
              <option value="Maple Ridge">Maple Ridge</option>
              <option value="New Westminster">New Westminster</option>
              <option value="Port Moody">Port Moody</option>
              <option value="Richmond">Richmond</option>
              <option value="Surrey">Surrey</option>
              <option value="Vancouver">Vancouver</option>
              <option value="White Rock">White Rock</option>
            </select>
          </div>

          <Divider />
          <div className="inputContainer description">
            <label>
              DESCRIPTION<span>*</span>
            </label>
            <textarea type="text" name="description" placeholder="Tell us more about your lovely pet!" value={formData.description} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer characteristics">
            <label>
              CHARACTERISTICS <small style={{ marginLeft: "3px" }}> (Choose 3)</small>
              <span>*</span>
            </label>
            <ul>
              {petCharacteristics.map((characteristic, i) => (
                <li key={`characteristic-${i}`} className={`${checkIfSelected(characteristic)}`} onClick={() => selectCharacteristic(characteristic)}>
                  {characteristic}
                </li>
              ))}
            </ul>
          </div>

          {/* SNS SECTION */}
          <Fragment>
            <h3>
              SNS <small>(OPTIONAL)</small>
            </h3>
            <div className="opener">
              <div className="inputContainer social">
                <div>
                  <i className="fab fa-youtube"></i>
                  <input type="email" name="youtube" placeholder="https://www.youtube.com/" value={youtube && youtube} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i className="fab fa-twitter"></i>
                  <input type="text" name="twitter" placeholder="https://www.twitter.com/" value={twitter && twitter} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i className="fab fa-facebook-square"></i>
                  <input type="text" name="facebook" placeholder="https://www.facebook.com/" value={facebook && facebook} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i className="fab fa-instagram"></i>
                  <input type="text" name="instagram" placeholder="https://www.instagram.com/" value={instagram && instagram} onChange={(e) => onChange(e)} />
                </div>
              </div>
            </div>
          </Fragment>

          {/* LOOKING FOR SECTION */}
          <Fragment>
            <h3>
              YOUR PET'S TYPE <small>(OPTIONAL)</small>
            </h3>
            <div className="opener">
              <div className="inputContainer">
                <label>AGE</label>

                <select name="forAge" name="forAge" value={formData.forAge} value={formData && formData.forAge} onChange={(e) => onChange(e)}>
                  <option value="" disabled selected className="default"></option>
                  <option value="Any">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                </select>
              </div>
              <Divider />
              <div className="inputContainer">
                <label>GENDER</label>
                <select name="forGender" value={formData.forGender} onChange={(e) => onChange(e)}>
                  <option value="" disabled selected className="default"></option>
                  <option value="Any">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <Divider />
              <div className="inputContainer">
                <label>LOCATION</label>
                <select name="forLocation" value={formData && formData.forLocation} onChange={(e) => onChange(e)}>
                  <option value="" disabled selected className="default"></option>
                  <option value="Any">Any</option>
                  <option value="Abbotsford">Abbotsford</option>
                  <option value="Burnaby">Burnaby</option>
                  <option value="Chilliwack">Chilliwack</option>
                  <option value="Coquitlam">Coquitlam</option>
                  <option value="Delta">Delta</option>
                  <option value="Langley">Langley</option>
                  <option value="Maple Ridge">Maple Ridge</option>
                  <option value="New Westminster">New Westminster</option>
                  <option value="Port Moody">Port Moody</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Surrey">Surrey</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="White Rock">White Rock</option>
                </select>
              </div>
              <Divider />
              <div className="inputContainer description">
                <label>WHAT IS YOUR PET LOOKING FOR?</label>
                {/* <input
                  style={{ width: "100%" }}
                  type="text"
                  name="forWhatfor"
                  placeholder="Ex) Friendship, True Love, Walk-buddy, ..."
                  value={formData && formData.forWhatfor}
                  onChange={(e) => onChange(e)}
                /> */}
                <select style={{ width: "100%" }} name="forWhatfor" value={formData && formData.forWhatfor} onChange={(e) => onChange(e)}>
                  <option value="" disabled selected className="default"></option>
                  <option value="Any">Any</option>
                  <option value="True Love">True Love</option>
                  <option value="Friendship">Friendship</option>
                  <option value="Walk-buddy">Walk-buddy</option>
                  <option value="Just for fun">Just for fun</option>
                </select>
              </div>
              <Divider />
              <div className="inputContainer description">
                <label>ANYTHING TO SHARE?</label>
                <textarea type="text" name="forDescription" placeholder="Want to share more? Let us know!" value={formData && formData.forDescription} onChange={(e) => onChange(e)} />
              </div>
              <Divider />
            </div>
          </Fragment>
        </form>
        <Modal.Actions>
          <Button className="deleteBtn" content="DELETE ACCOUNT" onClick={() => deleteAccount()}></Button>
          <Button className="submitBtn" content="CREATE/UPDATE" labelPosition="right" icon="checkmark" onClick={() => onSubmit()} positive />
        </Modal.Actions>
      </div>
    </Fragment>
  );
};

CreatePetProfile.propTypes = {};

const mapStateToProps = (state) => ({
  modalStatus: state.petProfile.closeModal,
});

export default connect(mapStateToProps, { putPetProfile, setAlert, openPetProfileModal, putLookingFor, deleteAccount })(CreatePetProfile);
