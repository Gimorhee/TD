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
    breed: "",
    gender: "",
    characteristics: [],
    description: "",
    location: "",
    youtube: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });

  const { name, age, breed, gender, characteristics, description, location, lookingFor, youtube, twitter, instagram, facebook } = formData;

  // LOOKINGFOR FORM DATA
  const [lookingForData, setLookingForData] = useState({
    age: "",
    breed: "",
    location: "",
    description: "",
    gender: "",
    whatfor: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age,
        breed: profile.breed,
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
      });

      setLookingForData(profile.lookingFor);
    }
  }, [profile.loading]);

  //   FOR NORMAL
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FOR LOOKING FOR
  const lookingForChange = (e) => {
    setLookingForData({
      ...lookingForData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const newFormData = {
      name,
      age,
      breed,
      gender,
      characteristics,
      description,
      location,
      lookingFor,
      youtube,
      twitter,
      instagram,
      facebook,
    };

    if (characteristics.length < 3) {
      setAlert("Please select 3 characteristics of your pet", "red");
    }

    if (characteristics.length === 3) {
      putPetProfile(newFormData);
    }
  };

  const handleLookFor = () => {
    const { age, breed, gender, location, description, whatfor } = lookingForData;

    if (age === "" && breed === "" && gender === "" && location === "" && description === "" && whatfor === "") {
      setAlert("Please fill out at least one of the optional forms", "red");
    } else {
      putLookingFor(lookingForData);
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
            <label>
              NAME <span>*</span>
            </label>
            <input type="text" name="name" value={formData.name} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer">
            <label>
              AGE <span>*</span>
            </label>
            <input type="text" name="age" value={formData.age} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer">
            <label>
              GENDER <span>*</span>
            </label>
            <input type="text" name="gender" value={formData.gender} onChange={(e) => onChange(e)} />
            <div></div>
          </div>
          <Divider />
          <div className="inputContainer">
            <label>LOCATION</label>
            <input type="text" name="location" placeholder="Ex) Vancouver" value={formData.location} onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer">
            <label>BREED</label>
            <input type="text" name="breed" value={formData.breed} placeholder="(optional)" onChange={(e) => onChange(e)} />
          </div>
          <Divider />
          <div className="inputContainer description">
            <label>
              DESCRIPTION <span>*</span>
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
                  <i class="fab fa-youtube"></i>
                  <input type="email" name="youtube" placeholder="https://www.youtube.com/" value={youtube && youtube} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i class="fab fa-twitter"></i>
                  <input type="text" name="twitter" placeholder="https://www.twitter.com/" value={twitter && twitter} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i class="fab fa-facebook-square"></i>
                  <input type="text" name="facebook" placeholder="https://www.facebook.com/" value={facebook && facebook} onChange={(e) => onChange(e)} />
                </div>
                <Divider />
                <div>
                  <i class="fab fa-instagram"></i>
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
                <input type="text" name="age" placeholder="Ex) Any, ..." value={lookingForData && lookingForData.age} onChange={(e) => lookingForChange(e)} />
              </div>
              <Divider />
              <div className="inputContainer">
                <label>BREED</label>
                <input type="text" name="breed" placeholder="Ex) Any, ..." value={lookingForData && lookingForData.breed} onChange={(e) => lookingForChange(e)} />
              </div>
              <Divider />
              <div className="inputContainer">
                <label>GENDER</label>
                <input type="text" name="gender" placeholder="Ex) Any, ..." value={lookingForData && lookingForData.gender} onChange={(e) => lookingForChange(e)} />
              </div>
              <Divider />
              <div className="inputContainer">
                <label>LOCATION</label>
                <input type="text" name="location" placeholder="Ex) Any, Vancouver, ..." value={lookingForData && lookingForData.location} onChange={(e) => lookingForChange(e)} />
              </div>
              <Divider />
              <div className="inputContainer description">
                <label>WHAT IS YOUR PET LOOKING FOR?</label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="whatfor"
                  placeholder="Ex) Friendship, True Love, Walk-buddy, ..."
                  value={lookingForData && lookingForData.whatfor}
                  onChange={(e) => lookingForChange(e)}
                />
              </div>
              <Divider />
              <div className="inputContainer description">
                <label>DESCRIPTION</label>
                <textarea type="text" name="description" placeholder="Want to share more? Let us know!" value={lookingForData && lookingForData.description} onChange={(e) => lookingForChange(e)} />
              </div>
              <div className="lookForBtn" onClick={() => handleLookFor()}>
                UPDATE YOUR PET'S TYPE
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
