import { GET_PET_PROFILE, PET_PROFILE_ERROR } from "../actions/types";
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
