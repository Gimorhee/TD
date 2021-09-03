import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import AllPetProfiles from "./Main/AllPetProfiles";
import Posts from "./Main/Posts";
import Messages from "./Main/Messages";
import PropTypes from "prop-types";

// ACTIONS
import { getAllPetProfiles, likePetProfile, unlikePetProfile, deleteMessage, getPetProfileById, sendMessage } from "../../actions/petProfile";
import { getPosts, likePost, unlikePost, deletePost, addPost } from "../../actions/post";
import { setAlert } from "../../actions/alert";

// REDUX
import { connect } from "react-redux";

const Main = ({ auth, petProfile, likePetProfile, unlikePetProfile, getAllPetProfiles, post, getPosts, setAlert, likePost, unlikePost, deletePost, addPost, deleteMessage, getPetProfileById }) => {
  useEffect(() => {
    getAllPetProfiles();
  }, [getAllPetProfiles]);

  const panes = [
    {
      menuItem: "PROFILES",
      render: () => (
        <Tab.Pane attached={false}>
          <AllPetProfiles auth={auth} petProfile={petProfile} likePetProfile={likePetProfile} unlikePetProfile={unlikePetProfile} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "POSTS",
      render: () => (
        <Tab.Pane attached={false}>
          <Posts post={post} getPosts={getPosts} petProfile={petProfile} auth={auth} setAlert={setAlert} likePost={likePost} unlikePost={unlikePost} deletePost={deletePost} addPost={addPost} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "MESSAGES",
      render: () => (
        <Tab.Pane attached={false}>
          <Messages auth={auth} petProfile={petProfile} deleteMessage={deleteMessage} getPetProfileById={getPetProfileById} sendMessage={sendMessage} setAlert={setAlert} />
        </Tab.Pane>
      ),
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
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  likePetProfile: PropTypes.func.isRequired,
  unlikePetProfile: PropTypes.func.isRequired,
  getPetProfileById: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  petProfile: state.petProfile,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  likePetProfile,
  unlikePetProfile,
  getAllPetProfiles,
  getPosts,
  setAlert,
  likePost,
  unlikePost,
  deletePost,
  addPost,
  deleteMessage,
  getPetProfileById,
  sendMessage,
})(Main);
