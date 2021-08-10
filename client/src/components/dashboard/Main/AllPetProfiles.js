import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AllPetProfiles = ({ getAllPetProfiles, petProfile }) => {
  useEffect(() => {
    getAllPetProfiles();
  }, []);

  return <div className="allProfiles">ALL PET PROFILES COMPONENT</div>;
};

AllPetProfiles.propTypes = {};

export default AllPetProfiles;
