import { GET_PET_PROFILE, PET_PROFILE_ERROR, CLEAR_PET_PROFILE, PUT_PET_PROFILE, CLOSE_PET_PROFILE_MODAL, OPEN_PET_PROFILE_MODAL, PUT_LOOKFOR_PROFILE_INFO } from "../actions/types";

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
    case PUT_LOOKFOR_PROFILE_INFO:
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
    case PUT_PET_PROFILE:
      return {
        ...state,
        profile: payload,
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
