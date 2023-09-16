import axios from "axios";
import {
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  UPDATE_PROFILE_ADMIN_REQUEST,
  UPDATE_PROFILE_ADMIN_SUCCESS,
  UPDATE_PROFILE_ADMIN_FAIL,
  UPDATE_PASSWORD_ADMIN_REQUEST,
  UPDATE_PASSWORD_ADMIN_SUCCESS,
  UPDATE_PASSWORD_ADMIN_FAIL,
  CREATE_NHANVIEN_REQUEST,
  CREATE_NHANVIEN_SUCCESS,
  CREATE_NHANVIEN_FAIL,
  ALL_NHANVIENS_REQUEST,
  ALL_NHANVIENS_SUCCESS,
  ALL_NHANVIENS_FAIL,
  LOGOUT_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAIL,
  CLEAR_ERRORS,
} from "../constants/adminConstants";

// LoginAdmin
export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_ADMIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_ADMIN_SUCCESS,
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ADMIN_REQUEST });

    const { data } = await axios.get("/api/v1/admin/profile");

    dispatch({
      type: LOAD_ADMIN_SUCCESS,
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfileAdmin = (adminData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_ADMIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      "/api/v1/admin/profile/update",
      adminData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_ADMIN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePasswordAdmin = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_ADMIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/admin/password/update",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_ADMIN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout User
export const logoutAdmin = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/admin/logout");

    dispatch({
      type: LOGOUT_ADMIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//NHANVIEN
export const createNhanvien = (nhanvienData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NHANVIEN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/create/nhanvien",
      nhanvienData,
      config
    );

    dispatch({
      type: CREATE_NHANVIEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NHANVIEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all nhanviens
export const allNhanviens = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NHANVIENS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/nhanviens");

    dispatch({
      type: ALL_NHANVIENS_SUCCESS,
      payload: data.nhanviens,
    });
  } catch (error) {
    dispatch({
      type: ALL_NHANVIENS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
