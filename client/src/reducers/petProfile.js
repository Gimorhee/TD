import {
  GET_PET_PROFILE,
  GET_PET_PROFILE_BY_ID,
  PET_PROFILE_ERROR,
  CLEAR_PET_PROFILE,
  PUT_PET_PROFILE,
  CLOSE_PET_PROFILE_MODAL,
  OPEN_PET_PROFILE_MODAL,
  PUT_LOOKFOR_PROFILE_INFO,
  GET_ALL_PET_PROFILES,
  UPDATE_PET_PROFILE_LIKES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: {},
  closeModal: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PET_PROFILE:
    case GET_PET_PROFILE_BY_ID:
    case PUT_LOOKFOR_PROFILE_INFO:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_ALL_PET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PET_PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PET_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case PUT_PET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case UPDATE_PET_PROFILE_LIKES:
      return {
        ...state,
        profiles: state.profiles.map((petProfile) => (petProfile._id === payload.petProfileId ? { ...petProfile, likes: payload.likes } : petProfile)),
        loading: false,
      };
    case CLOSE_PET_PROFILE_MODAL:
      return {
        ...state,
        closeModal: true,
      };
    case OPEN_PET_PROFILE_MODAL:
      return {
        ...state,
        closeModal: false,
      };
    default:
      return state;
  }
}
