import {
  LOGIN_SHIPPER_REQUEST,
  LOGIN_SHIPPER_SUCCESS,
  LOGIN_SHIPPER_FAIL,
  LOAD_SHIPPER_REQUEST,
  LOAD_SHIPPER_SUCCESS,
  LOAD_SHIPPER_FAIL,
  UPDATE_PROFILE_SHIPPER_REQUEST,
  UPDATE_PROFILE_SHIPPER_SUCCESS,
  UPDATE_PROFILE_SHIPPER_RESET,
  UPDATE_PROFILE_SHIPPER_FAIL,
  UPDATE_PASSWORD_SHIPPER_REQUEST,
  UPDATE_PASSWORD_SHIPPER_SUCCESS,
  UPDATE_PASSWORD_SHIPPER_RESET,
  UPDATE_PASSWORD_SHIPPER_FAIL,
  LOGOUT_SHIPPER_SUCCESS,
  LOGOUT_SHIPPER_FAIL,
  CLEAR_ERRORS,
} from "../constants/shipperConstants";

export const shipperAuthReducer = (state = { shipper: {} }, action) => {
  switch (action.type) {
    case LOGIN_SHIPPER_REQUEST:
    case LOAD_SHIPPER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SHIPPER_SUCCESS:
    case LOAD_SHIPPER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        shipper: action.payload,
      };

    case LOGOUT_SHIPPER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        shipper: null,
      };

    case LOAD_SHIPPER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        shipper: null,
        error: action.payload,
      };

    case LOGOUT_SHIPPER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_SHIPPER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        shipper: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const shipperprofileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SHIPPER_REQUEST:
    case UPDATE_PASSWORD_SHIPPER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SHIPPER_SUCCESS:
    case UPDATE_PASSWORD_SHIPPER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_SHIPPER_RESET:
    case UPDATE_PASSWORD_SHIPPER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PROFILE_SHIPPER_FAIL:
    case UPDATE_PASSWORD_SHIPPER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
