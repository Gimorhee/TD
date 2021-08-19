import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import AllPetProfiles from "./Main/AllPetProfiles";
import Posts from "./Main/Posts";
import PropTypes from "prop-types";

// ACTIONS
import { getAllPetProfiles } from "../../actions/petProfile";
import { getPosts, likePost, unlikePost } from "../../actions/post";
import { setAlert } from "../../actions/alert";

// REDUX
import { connect } from "react-redux";

const Main = ({ auth, petProfile, getAllPetProfiles, post, getPosts, setAlert, likePost, unlikePost }) => {
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
          <Posts post={post} getPosts={getPosts} petProfile={petProfile} auth={auth} setAlert={setAlert} likePost={likePost} unlikePost={unlikePost} />
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
  setAlert: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllPetProfiles, getPosts, setAlert, likePost, unlikePost })(Main);
