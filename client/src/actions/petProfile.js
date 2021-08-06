import { CLOSE_PET_PROFILE_MODAL, GET_PET_PROFILE, OPEN_PET_PROFILE_MODAL, PET_PROFILE_ERROR, PUT_PET_PROFILE } from "../actions/types";
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

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "teal"));

      dispatch({
        type: CLOSE_PET_PROFILE_MODAL,
      });

      //   dispatch({
      //     type: OPEN_PET_PROFILE_MODAL,
      //   });
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

export const openPetProfileModal = () => (dispatch) => {
  dispatch({
    type: OPEN_PET_PROFILE_MODAL,
  });
};
