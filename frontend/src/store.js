import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
  productTopRatedReducers,
} from "./reducers/productReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
  allKhachsReducer,
} from "./reducers/userReducers";

import {
  adminAuthReducer,
  adminReducer,
  nhanvienReducer,
  allNhanviensReducer,
} from "./reducers/adminReducers";

import {
  nhanvienAuthReducer,
  nhanvienprofileReducer,
} from "./reducers/nhanvienReducers";

import { cartReducer } from "./reducers/cartReducers";
import { favouriteReducer } from "./reducers/favouriteReducer";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
  allOrderProcessingReducer,
  allOrderCancelReducer,
  allOrderProcessedReducer,
  allOrderShippingReducer,
  allOrderShippedReducer,
  myOrdersProcessingReducer,
  myOrdersCancelReducer,
  myOrdersProcessedReducer,
  myOrdersShippingReducer,
  myOrdersShippedReducer,
  cancelOrderReducer,
} from "./reducers/orderReducers";

import {
  newCategoryReducer,
  categoryReducer,
  dltCategoryReducer,
  updateCategoryReducer,
  categoryDetailsReducer,
} from "./reducers/categoryReducer";

import {
  salesPerMonthReducer,
  productSalesReducer,
} from "./reducers/chartReducers";

import {
  addressDetailsReducer,
  addressReducer,
  myAddressReducer,
  newAddressReducer,
} from "./reducers/addressReducers";

import {
  shipperAuthReducer,
  shipperprofileReducer,
} from "./reducers/shipperReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
  productTopRated: productTopRatedReducers,
  newCategory: newCategoryReducer,
  category: categoryReducer,
  dltCategory: dltCategoryReducer,
  updateCategory: updateCategoryReducer,
  categoryDetails: categoryDetailsReducer,
  favourite: favouriteReducer,
  allOrderProcessing: allOrderProcessingReducer,
  allOrderCancel: allOrderCancelReducer,
  allOrderProcessed: allOrderProcessedReducer,
  allOrderShipping: allOrderShippingReducer,
  allOrderShipped: allOrderShippedReducer,
  myOrdersProcessing: myOrdersProcessingReducer,
  myOrdersCancel: myOrdersCancelReducer,
  myOrdersProcessed: myOrdersProcessedReducer,
  myOrdersShipping: myOrdersShippingReducer,
  myOrdersShipped: myOrdersShippedReducer,
  adminAuth: adminAuthReducer,
  admin: adminReducer,
  cancelOrder: cancelOrderReducer,
  nhanvien: nhanvienReducer,
  allNhanviens: allNhanviensReducer,
  nhanvienAuth: nhanvienAuthReducer,
  nhanvienprofile: nhanvienprofileReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  shippingData: myAddressReducer,
  shippingInfo: newAddressReducer,
  orderAddress: addressDetailsReducer,
  updateAddress: addressReducer,
  allKhachs: allKhachsReducer,
  shipperAuth: shipperAuthReducer,
  shipperprofile: shipperprofileReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
