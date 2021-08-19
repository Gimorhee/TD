import { GET_POST, GET_POSTS, GET_USER_POSTS, GET_POSTS_BY_ID, POST_ERROR, UPDATE_POST_LIKES, DELETE_POST } from "../actions/types";
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

// LIKE POST
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_POST_LIKES,
      payload: {
        postId,
        likes: res.data,
      },
    });
    dispatch(setAlert("Thanks for the like :)", "teal"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("You've already liked this post :)", "red"));
  }
};

// UNLIKE POST
export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_POST_LIKES,
      payload: {
        postId,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Dislike is not allowed here :(", "red"));
  }
};

// DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Your post is removed", "teal"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
