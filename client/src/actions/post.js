import { GET_POST, GET_POSTS, GET_USER_POSTS, GET_POSTS_BY_ID, POST_ERROR } from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
