import {
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  UPDATE_PROFILE_ADMIN_REQUEST,
  UPDATE_PROFILE_ADMIN_SUCCESS,
  UPDATE_PROFILE_ADMIN_RESET,
  UPDATE_PROFILE_ADMIN_FAIL,
  UPDATE_PASSWORD_ADMIN_REQUEST,
  UPDATE_PASSWORD_ADMIN_SUCCESS,
  UPDATE_PASSWORD_ADMIN_RESET,
  UPDATE_PASSWORD_ADMIN_FAIL,
  CREATE_NHANVIEN_REQUEST,
  CREATE_NHANVIEN_SUCCESS,
  CREATE_NHANVIEN_FAIL,
  CREATE_NHANVIEN_RESET,
  ALL_NHANVIENS_REQUEST,
  ALL_NHANVIENS_SUCCESS,
  ALL_NHANVIENS_FAIL,
  LOGOUT_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAIL,
  CLEAR_ERRORS,
} from "../constants/adminConstants";

export const adminAuthReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_REQUEST:
    case LOAD_ADMIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_ADMIN_SUCCESS:
    case LOAD_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        admin: action.payload,
      };

    case LOGOUT_ADMIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        admin: null,
      };

    case LOAD_ADMIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        admin: null,
        error: action.payload,
      };

    case LOGOUT_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
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

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_ADMIN_REQUEST:
    case UPDATE_PASSWORD_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_ADMIN_SUCCESS:
    case UPDATE_PASSWORD_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_ADMIN_RESET:
    case UPDATE_PASSWORD_ADMIN_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PROFILE_ADMIN_FAIL:
    case UPDATE_PASSWORD_ADMIN_FAIL:
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

//NHANVIEN
export const nhanvienReducer = (state = { nhanvien: {} }, action) => {
  switch (action.type) {
    case CREATE_NHANVIEN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NHANVIEN_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        nhanvien: action.payload,
      };

    case CREATE_NHANVIEN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_NHANVIEN_RESET:
      return {
        ...state,
        success: false,
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

export const allNhanviensReducer = (state = { nhanviens: [] }, action) => {
  switch (action.type) {
    case ALL_NHANVIENS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_NHANVIENS_SUCCESS:
      return {
        ...state,
        loading: false,
        nhanviens: action.payload,
      };

    case ALL_NHANVIENS_FAIL:
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
