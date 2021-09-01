import {
  CLOSE_PET_PROFILE_MODAL,
  GET_PET_PROFILE,
  OPEN_PET_PROFILE_MODAL,
  PET_PROFILE_ERROR,
  PUT_PET_PROFILE,
  PUT_LOOKFOR_PROFILE_INFO,
  DELETE_ACCOUNT,
  CLEAR_PET_PROFILE,
  GET_ALL_PET_PROFILES,
  GET_PET_PROFILE_BY_ID,
  UPDATE_PET_PROFILE_LIKES,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE_ERROR,
} from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

// Get current user's pet profile
export const getCurrentPetProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/petProfile/me");

    dispatch({
      type: GET_PET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get pet profile by ID
export const getPetProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/petProfile/${userId}`);

    dispatch({
      type: GET_PET_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// CREATE OR UPDATE PET PROFILE
export const putPetProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post("/api/petProfile", body, config);

      dispatch({
        type: PUT_PET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Updated", "teal"));

      dispatch({
        type: CLOSE_PET_PROFILE_MODAL,
      });
    } catch (err) {
      const errors = err && err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
      }

      dispatch({
        type: PET_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// CREATE OR UPDATE 'LOOKINGFOR' INFORMATION
export const putLookingFor = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put("/api/petProfile/lookingFor", body, config);

    dispatch(setAlert("Pet type has been updated!", "teal"));

    dispatch({
      type: PUT_LOOKFOR_PROFILE_INFO,
      payload: res.data,
    });
  } catch (err) {
    const errors = err && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
    }

    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET ALL PET PROFILES
export const getAllPetProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/petProfile");

    dispatch({
      type: GET_ALL_PET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// HANDLE PETPROFILE FORM MODAL STATUS
export const openPetProfileModal = () => (dispatch) => {
  dispatch({
    type: OPEN_PET_PROFILE_MODAL,
  });
};

// DELETE ACCOUNT COMPLETELY
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This CANNOT be undone!")) {
    try {
      const res = await axios.delete("/api/petProfile");

      dispatch({
        type: CLEAR_PET_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      dispatch(setAlert("You account has been permanantly deleted", "teal"));
    } catch (err) {
      dispatch({
        type: PET_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// LIKE THE PET PROFILE
export const likePetProfile = (petProfileId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/petProfile/like/${petProfileId}`);

    dispatch({
      type: UPDATE_PET_PROFILE_LIKES,
      payload: {
        petProfileId,
        likes: res.data,
      },
    });

    dispatch(setAlert("Thanks for the like :)", "teal"));
  } catch (err) {
    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("You've already liked this post :)", "red"));
  }
};

// UNLIKE THE PET PROFILE
export const unlikePetProfile = (petProfileId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/petProfile/unlike/${petProfileId}`);

    dispatch({
      type: UPDATE_PET_PROFILE_LIKES,
      payload: {
        petProfileId,
        likes: res.data,
      },
    });

    // dispatch(setAlert("Disliked the profile :)", "red"));
  } catch (err) {
    dispatch({
      type: PET_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Dislike is not allowed here :(", "red"));
  }
};

// SEND MESSAGE
export const sendMessage = (petProfileId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/petProfile/message/${petProfileId}`, formData, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });

    dispatch(setAlert("Message sent!", "teal"));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETTE MESSAGE
export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/petProfile/message/${messageId}`);
    dispatch({
      type: DELETE_MESSAGE,
      payload: messageId,
    });

    dispatch(setAlert("Message Removed"));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
