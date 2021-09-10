import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CLEAR_PET_PROFILE } from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { getCurrentPetProfile } from "./petProfile";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Regiser User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(getCurrentPetProfile());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err && err.response && err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "red")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//   Logout & Clear Profile
export const logout = (history) => (dispatch) => {
  dispatch({
    type: CLEAR_PET_PROFILE,
  });

  dispatch({
    type: LOG_OUT,
  });

  history.push("/");
};
