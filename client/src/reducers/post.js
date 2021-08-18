import { GET_POST, GET_POSTS, GET_USER_POSTS, GET_POSTS_BY_ID, POST_ERROR } from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  userPosts: [],
  postsById: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case GET_POSTS_BY_ID:
      return {
        ...state,
        postsById: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}