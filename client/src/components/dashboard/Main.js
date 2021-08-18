import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import AllPetProfiles from "./Main/AllPetProfiles";
import Posts from "./Main/Posts";
import PropTypes from "prop-types";

// ACTIONS
import { getAllPetProfiles } from "../../actions/petProfile";
import { getPosts } from "../../actions/post";

// REDUX
import { connect } from "react-redux";

const Main = ({ petProfile, getAllPetProfiles, post, getPosts }) => {
  useEffect(() => {
    getAllPetProfiles();
  }, [getAllPetProfiles]);

  const panes = [
    {
      menuItem: "PROFILES",
      render: () => (
        <Tab.Pane attached={false}>
          <AllPetProfiles petProfile={petProfile} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "POSTS",
      render: () => (
        <Tab.Pane attached={false}>
          <Posts post={post} getPosts={getPosts} petProfile={petProfile} />
        </Tab.Pane>
      ),
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
  petProfile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPetProfiles, getPosts })(Main);
