import axios from "axios";
import {
  LOGIN_NHANVIEN_REQUEST,
  LOGIN_NHANVIEN_SUCCESS,
  LOGIN_NHANVIEN_FAIL,
  LOAD_NHANVIEN_REQUEST,
  LOAD_NHANVIEN_SUCCESS,
  LOAD_NHANVIEN_FAIL,
  UPDATE_PROFILE_NHANVIEN_REQUEST,
  UPDATE_PROFILE_NHANVIEN_SUCCESS,
  UPDATE_PROFILE_NHANVIEN_FAIL,
  UPDATE_PASSWORD_NHANVIEN_REQUEST,
  UPDATE_PASSWORD_NHANVIEN_SUCCESS,
  UPDATE_PASSWORD_NHANVIEN_FAIL,
  LOGOUT_NHANVIEN_SUCCESS,
  LOGOUT_NHANVIEN_FAIL,
  CLEAR_ERRORS,
} from "../constants/nhanvienConstants";

// LoginNhanvien
export const loginNhanvien = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_NHANVIEN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/nhanvien/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_NHANVIEN_SUCCESS,
      payload: data.nhanvien,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_NHANVIEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Nhanvien
export const loadNhanvien = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_NHANVIEN_REQUEST });

    const { data } = await axios.get("/api/v1/nhanvien/profile");

    dispatch({
      type: LOAD_NHANVIEN_SUCCESS,
      payload: data.nhanvien,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NHANVIEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfileNhanvien = (nhanvienData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_NHANVIEN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      "/api/v1/nhanvien/profile/update",
      nhanvienData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_NHANVIEN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_NHANVIEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePasswordNhanvien = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_NHANVIEN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/nhanvien/password/update",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_NHANVIEN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_NHANVIEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout Nhanvien
export const logoutNhanvien = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/nhanvien/logout");

    dispatch({
      type: LOGOUT_NHANVIEN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_NHANVIEN_FAIL,
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
