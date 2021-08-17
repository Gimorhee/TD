import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import AllPetProfiles from "./Main/AllPetProfiles";
import PropTypes from "prop-types";

import { getAllPetProfiles } from "../../actions/petProfile";

// REDUX
import { connect } from "react-redux";

const Main = ({ petProfile, getAllPetProfiles }) => {
  useEffect(() => {
    getAllPetProfiles();
  }, []);

  const panes = [
    {
      menuItem: "PROFILES",
      render: () => (
        <Tab.Pane attached={false}>
          <AllPetProfiles petProfile={petProfile} />
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: "CUTIES",
    //   render: () => <Tab.Pane attached={false}>ALL PROFILES COMPONENT</Tab.Pane>,
    // },
    {
      menuItem: "POSTS",
      render: () => <Tab.Pane attached={false}>ALL POSTS COMPONENT</Tab.Pane>,
    },
    {
      menuItem: "MESSAGES",
      render: () => <Tab.Pane attached={false}>MESSAGES COMPONENT (TODO)</Tab.Pane>,
    },
  ];

  return (
    <main className="main">
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </main>
  );
};

Main.propTypes = {
  getAllPetProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
});

export default connect(mapStateToProps, { getAllPetProfiles })(Main);
