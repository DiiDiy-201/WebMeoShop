import {
  LOGIN_NHANVIEN_REQUEST,
  LOGIN_NHANVIEN_SUCCESS,
  LOGIN_NHANVIEN_FAIL,
  LOAD_NHANVIEN_REQUEST,
  LOAD_NHANVIEN_SUCCESS,
  LOAD_NHANVIEN_FAIL,
  UPDATE_PROFILE_NHANVIEN_REQUEST,
  UPDATE_PROFILE_NHANVIEN_SUCCESS,
  UPDATE_PROFILE_NHANVIEN_RESET,
  UPDATE_PROFILE_NHANVIEN_FAIL,
  UPDATE_PASSWORD_NHANVIEN_REQUEST,
  UPDATE_PASSWORD_NHANVIEN_SUCCESS,
  UPDATE_PASSWORD_NHANVIEN_RESET,
  UPDATE_PASSWORD_NHANVIEN_FAIL,
  LOGOUT_NHANVIEN_SUCCESS,
  LOGOUT_NHANVIEN_FAIL,
  CLEAR_ERRORS,
} from "../constants/nhanvienConstants";

export const nhanvienAuthReducer = (state = { nhanvien: {} }, action) => {
  switch (action.type) {
    case LOGIN_NHANVIEN_REQUEST:
    case LOAD_NHANVIEN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_NHANVIEN_SUCCESS:
    case LOAD_NHANVIEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        nhanvien: action.payload,
      };

    case LOGOUT_NHANVIEN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        nhanvien: null,
      };

    case LOAD_NHANVIEN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        nhanvien: null,
        error: action.payload,
      };

    case LOGOUT_NHANVIEN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_NHANVIEN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        nhanvien: null,
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

export const nhanvienprofileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_NHANVIEN_REQUEST:
    case UPDATE_PASSWORD_NHANVIEN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_NHANVIEN_SUCCESS:
    case UPDATE_PASSWORD_NHANVIEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_NHANVIEN_RESET:
    case UPDATE_PASSWORD_NHANVIEN_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PROFILE_NHANVIEN_FAIL:
    case UPDATE_PASSWORD_NHANVIEN_FAIL:
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
