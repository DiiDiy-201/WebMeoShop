const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  allOrderProcessing,
  allOrderProcessed,
  allOrderShipping,
  allOrderShipped,
  myOrdersProcessing,
  myOrdersProcessed,
  myOrdersShipping,
  myOrdersShipped,
  allOrderCancel,
  myOrdersCancel,
  totalOrders,
  totalSales,
  customerSales,
  salesPerMonth,
} = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedNhanvien,
  isAuthenticatedShipper,
} = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/order/:id").put(isAuthenticatedUser, updateOrder);

//moi
router
  .route("/orders/me/processing")
  .get(isAuthenticatedUser, myOrdersProcessing);
router.route("/orders/me/cancel").get(isAuthenticatedUser, myOrdersCancel);
router
  .route("/orders/me/processed")
  .get(isAuthenticatedUser, myOrdersProcessed);
router.route("/orders/me/shipping").get(isAuthenticatedUser, myOrdersShipping);
router.route("/orders/me/shipped").get(isAuthenticatedUser, myOrdersShipped);

//admin
router
  .route("/admin/orders/")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteOrder);

//order filter
router
  .route("/admin/orders/processing")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrderProcessing);
router
  .route("/admin/orders/cancel")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrderCancel);
router
  .route("/admin/orders/processed")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrderProcessed);
router
  .route("/admin/orders/shipping")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrderShipping);
router
  .route("/admin/orders/shipped")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allOrderShipped);

//nhanvien
router
  .route("/nhanvien/orders/")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrders);
router
  .route("/nhanvien/order/:id")
  .put(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), updateOrder)
  .delete(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), deleteOrder);

//order filter nhanvien
router
  .route("/nhanvien/orders/processing")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrderProcessing);
router
  .route("/nhanvien/orders/cancel")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrderCancel);
router
  .route("/nhanvien/orders/processed")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrderProcessed);
router
  .route("/nhanvien/orders/shipping")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrderShipping);
router
  .route("/nhanvien/orders/shipped")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), allOrderShipped);

//sales chart
router.route("/orders/total-orders").get(totalOrders);
router.route("/orders/total-sales").get(totalSales);
router.route("/orders/customer-sales").get(customerSales);
router.route("/orders/sales-per-month").get(salesPerMonth);

//shipper
router
  .route("/shipper/order/:id")
  .put(isAuthenticatedShipper, authorizeRoles("shipper"), updateOrder);
router
  .route("/shipper/orders/processed")
  .get(isAuthenticatedShipper, authorizeRoles("shipper"), allOrderProcessed);
router
  .route("/shipper/orders/shipping")
  .get(isAuthenticatedShipper, authorizeRoles("shipper"), allOrderShipping);
router
  .route("/shipper/orders/shipped")
  .get(isAuthenticatedShipper, authorizeRoles("shipper"), allOrderShipped);

module.exports = router;
