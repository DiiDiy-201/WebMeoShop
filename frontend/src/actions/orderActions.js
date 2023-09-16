import axios from "axios";

import { CLEAR_CART } from "../constants/cartConstants";

import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDER_CANCEL_FAIL,
  ALL_ORDER_CANCEL_REQUEST,
  ALL_ORDER_CANCEL_SUCCESS,
  ALL_ORDER_PROCESSED_FAIL,
  ALL_ORDER_PROCESSED_REQUEST,
  ALL_ORDER_PROCESSED_SUCCESS,
  ALL_ORDER_PROCESSING_FAIL,
  ALL_ORDER_PROCESSING_REQUEST,
  ALL_ORDER_PROCESSING_SUCCESS,
  ALL_ORDER_SHIPPED_FAIL,
  ALL_ORDER_SHIPPED_REQUEST,
  ALL_ORDER_SHIPPED_SUCCESS,
  ALL_ORDER_SHIPPING_FAIL,
  ALL_ORDER_SHIPPING_REQUEST,
  ALL_ORDER_SHIPPING_SUCCESS,
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_CANCEL_FAIL,
  MY_ORDERS_CANCEL_REQUEST,
  MY_ORDERS_CANCEL_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_PROCESSED_FAIL,
  MY_ORDERS_PROCESSED_REQUEST,
  MY_ORDERS_PROCESSED_SUCCESS,
  MY_ORDERS_PROCESSING_FAIL,
  MY_ORDERS_PROCESSING_REQUEST,
  MY_ORDERS_PROCESSING_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SHIPPED_FAIL,
  MY_ORDERS_SHIPPED_REQUEST,
  MY_ORDERS_SHIPPED_SUCCESS,
  MY_ORDERS_SHIPPING_FAIL,
  MY_ORDERS_SHIPPING_REQUEST,
  MY_ORDERS_SHIPPING_SUCCESS,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    // Xoa gio hang sau khi thanh toan
    dispatch({
      type: CLEAR_CART,
      payload: [],
    });
    // Xoa gio hang sau khi thanh toan
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders processing
export const myOrdersProcessing = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_PROCESSING_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me/processing");

    dispatch({
      type: MY_ORDERS_PROCESSING_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_PROCESSING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders cancel
export const myOrdersCancel = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_CANCEL_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me/cancel");

    dispatch({
      type: MY_ORDERS_CANCEL_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_CANCEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders processed
export const myOrdersProcessed = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_PROCESSED_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me/processed");

    dispatch({
      type: MY_ORDERS_PROCESSED_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_PROCESSED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders shipping
export const myOrdersShipping = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_SHIPPING_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me/shipping");

    dispatch({
      type: MY_ORDERS_SHIPPING_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_SHIPPING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders shipped
export const myOrdersShipped = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_SHIPPED_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me/shipped");

    dispatch({
      type: MY_ORDERS_SHIPPED_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_SHIPPED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//moi
// Get all order processing - ADMIN
export const allOrderProcessing = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_PROCESSING_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders/processing`);

    dispatch({
      type: ALL_ORDER_PROCESSING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_PROCESSING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order cancel - ADMIN
export const allOrderCancel = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_CANCEL_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders/cancel`);

    dispatch({
      type: ALL_ORDER_CANCEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_CANCEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order processed - ADMIN
export const allOrderProcessed = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_PROCESSED_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders/processed`);

    dispatch({
      type: ALL_ORDER_PROCESSED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_PROCESSED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipping - ADMIN
export const allOrderShipping = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPING_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders/shipping`);

    dispatch({
      type: ALL_ORDER_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipped - ADMIN
export const allOrderShipped = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPED_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders/shipped`);

    dispatch({
      type: ALL_ORDER_SHIPPED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPED_FAIL,
      payload: error.response.data.message,
    });
  }
};
//moi

// update order (ADMIN)
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete order (ADMIN)
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// cancel order
export const cancelOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/order/${id}`, orderData, config);

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//NHANVIEN
// Get all orders - NHANVIEN
export const nhanvienAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update order (NHANVIEN)
export const nhanvienupdateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/nhanvien/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete order (NHANVIEN)
export const nhanviendeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/nhanvien/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order processing - NHANVIEN
export const nhanvienallOrderProcessing = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_PROCESSING_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders/processing`);

    dispatch({
      type: ALL_ORDER_PROCESSING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_PROCESSING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order cancel - NHANVIEN
export const nhanvienallOrderCancel = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_CANCEL_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders/cancel`);

    dispatch({
      type: ALL_ORDER_CANCEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_CANCEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order processed - NHANVIEN
export const nhanvienallOrderProcessed = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_PROCESSED_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders/processed`);

    dispatch({
      type: ALL_ORDER_PROCESSED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_PROCESSED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipping - NHANVIEN
export const nhanvienallOrderShipping = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPING_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders/shipping`);

    dispatch({
      type: ALL_ORDER_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipped - NHANVIEN
export const nhanvienallOrderShipped = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPED_REQUEST });

    const { data } = await axios.get(`/api/v1/nhanvien/orders/shipped`);

    dispatch({
      type: ALL_ORDER_SHIPPED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPED_FAIL,
      payload: error.response.data.message,
    });
  }
};

//shipper
// Get all order processed - SHIPPER
export const shipperallOrderProcessed = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_PROCESSED_REQUEST });

    const { data } = await axios.get(`/api/v1/shipper/orders/processed`);

    dispatch({
      type: ALL_ORDER_PROCESSED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_PROCESSED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipping - SHIPPER
export const shipperallOrderShipping = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPING_REQUEST });

    const { data } = await axios.get(`/api/v1/shipper/orders/shipping`);

    dispatch({
      type: ALL_ORDER_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all order shipped - SHIPPER
export const shipperallOrderShipped = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_SHIPPED_REQUEST });

    const { data } = await axios.get(`/api/v1/shipper/orders/shipped`);

    dispatch({
      type: ALL_ORDER_SHIPPED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_SHIPPED_FAIL,
      payload: error.response.data.message,
    });
  }
};

//shipper update order
export const shipperupdateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/shipper/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
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
