import axios from "axios";
import {
  LOGIN_SHIPPER_REQUEST,
  LOGIN_SHIPPER_SUCCESS,
  LOGIN_SHIPPER_FAIL,
  LOAD_SHIPPER_REQUEST,
  LOAD_SHIPPER_SUCCESS,
  LOAD_SHIPPER_FAIL,
  UPDATE_PROFILE_SHIPPER_REQUEST,
  UPDATE_PROFILE_SHIPPER_SUCCESS,
  UPDATE_PROFILE_SHIPPER_FAIL,
  UPDATE_PASSWORD_SHIPPER_REQUEST,
  UPDATE_PASSWORD_SHIPPER_SUCCESS,
  UPDATE_PASSWORD_SHIPPER_FAIL,
  LOGOUT_SHIPPER_SUCCESS,
  LOGOUT_SHIPPER_FAIL,
  CLEAR_ERRORS,
} from "../constants/shipperConstants";

// LoginShipper
export const loginShipper = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_SHIPPER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/shipper/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SHIPPER_SUCCESS,
      payload: data.shipper,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_SHIPPER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Shipper
export const loadShipper = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_SHIPPER_REQUEST });

    const { data } = await axios.get("/api/v1/shipper/profile");

    dispatch({
      type: LOAD_SHIPPER_SUCCESS,
      payload: data.shipper,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SHIPPER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfileShipper = (shipperData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_SHIPPER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      "/api/v1/shipper/profile/update",
      shipperData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SHIPPER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_SHIPPER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePasswordShipper = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_SHIPPER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/shipper/password/update",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SHIPPER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_SHIPPER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout Shipper
export const logoutShipper = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/shipper/logout");

    dispatch({
      type: LOGOUT_SHIPPER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_SHIPPER_FAIL,
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
