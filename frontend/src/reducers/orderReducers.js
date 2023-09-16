import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_RESET,
  CANCEL_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_PROCESSING_REQUEST,
  ALL_ORDER_PROCESSING_SUCCESS,
  ALL_ORDER_PROCESSING_FAIL,
  ALL_ORDER_CANCEL_REQUEST,
  ALL_ORDER_CANCEL_SUCCESS,
  ALL_ORDER_CANCEL_FAIL,
  ALL_ORDER_PROCESSED_REQUEST,
  ALL_ORDER_PROCESSED_SUCCESS,
  ALL_ORDER_PROCESSED_FAIL,
  ALL_ORDER_SHIPPING_REQUEST,
  ALL_ORDER_SHIPPING_SUCCESS,
  ALL_ORDER_SHIPPING_FAIL,
  ALL_ORDER_SHIPPED_REQUEST,
  ALL_ORDER_SHIPPED_SUCCESS,
  ALL_ORDER_SHIPPED_FAIL,
  MY_ORDERS_PROCESSING_REQUEST,
  MY_ORDERS_PROCESSING_SUCCESS,
  MY_ORDERS_PROCESSING_FAIL,
  MY_ORDERS_CANCEL_REQUEST,
  MY_ORDERS_CANCEL_SUCCESS,
  MY_ORDERS_CANCEL_FAIL,
  MY_ORDERS_PROCESSED_REQUEST,
  MY_ORDERS_PROCESSED_SUCCESS,
  MY_ORDERS_PROCESSED_FAIL,
  MY_ORDERS_SHIPPING_REQUEST,
  MY_ORDERS_SHIPPING_SUCCESS,
  MY_ORDERS_SHIPPING_FAIL,
  MY_ORDERS_SHIPPED_REQUEST,
  MY_ORDERS_SHIPPED_SUCCESS,
  MY_ORDERS_SHIPPED_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
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

//MY ORDERS PROCESSING
export const myOrdersProcessingReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_PROCESSING_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_PROCESSING_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_PROCESSING_FAIL:
      return {
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

//MY ORDERS CANCEL
export const myOrdersCancelReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_CANCEL_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_CANCEL_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_CANCEL_FAIL:
      return {
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

//MY ORDERS PROCESSED
export const myOrdersProcessedReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_PROCESSED_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_PROCESSED_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_PROCESSED_FAIL:
      return {
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

//MY ORDERS SHIPPING
export const myOrdersShippingReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_SHIPPING_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SHIPPING_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_SHIPPING_FAIL:
      return {
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

//MY ORDERS SHIPPED
export const myOrdersShippedReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_SHIPPED_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SHIPPED_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_SHIPPED_FAIL:
      return {
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDERS_FAIL:
      return {
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

//MOI
export const allOrderProcessingReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_PROCESSING_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_PROCESSING_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDER_PROCESSING_FAIL:
      return {
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

export const allOrderCancelReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_CANCEL_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDER_CANCEL_FAIL:
      return {
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

export const allOrderProcessedReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_PROCESSED_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_PROCESSED_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDER_PROCESSED_FAIL:
      return {
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

export const allOrderShippingReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_SHIPPING_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_SHIPPING_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDER_SHIPPING_FAIL:
      return {
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

export const allOrderShippedReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_SHIPPED_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_SHIPPED_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDER_SHIPPED_FAIL:
      return {
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
//moi

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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

//cancel
export const cancelOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case CANCEL_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CANCEL_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
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
