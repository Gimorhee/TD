import { GET_PET_PROFILE, PET_PROFILE_ERROR, CLEAR_PET_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PET_PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    case CLEAR_PET_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
