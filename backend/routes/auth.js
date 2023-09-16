const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  createNhanvien,
  allNhanviens,
  loginNhanvien,
  getNhanvienProfile,
  logoutNhanvien,
  allKhachs,
  loginShipper,
  getShipperProfile,
  logoutShipper,
} = require("../controllers/authController");

const {
  newAddress,
  myAddress,
  getSingleAddress,
  deleteAddress,
  updateAddress,
} = require("../controllers/addressController");

const {
  isAuthenticatedUser,
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedNhanvien,
  isAuthenticatedShipper,
} = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//ADMIN ROUTE
router.route("/admin/profile/update").put(isAuthenticatedAdmin, updateProfile);
router
  .route("/admin/password/update")
  .put(isAuthenticatedAdmin, updatePassword);

router.route("/admin/login").post(loginAdmin);
router.route("/admin/profile").get(isAuthenticatedAdmin, getAdminProfile);
router.route("/admin/logout").get(logoutAdmin);
router
  .route("/admin/users")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allUsers);

//khach
router
  .route("/admin/khachs")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allKhachs);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteUser);

router
  .route("/admin/create/nhanvien")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), createNhanvien);

router
  .route("/admin/nhanviens")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), allNhanviens);

//NHANVIEN ROUTES
router.route("/nhanvien/login").post(loginNhanvien);
router
  .route("/nhanvien/profile")
  .get(isAuthenticatedNhanvien, getNhanvienProfile);
router
  .route("/nhanvien/profile/update")
  .put(isAuthenticatedNhanvien, updateProfile);
router
  .route("/nhanvien/password/update")
  .put(isAuthenticatedNhanvien, updatePassword);
router.route("/nhanvien/logout").get(logoutNhanvien);

//address
router.route("/address/new").post(isAuthenticatedUser, newAddress);
router.route("/address/me").get(isAuthenticatedUser, myAddress);
router
  .route("/address/:id")
  .get(isAuthenticatedUser, getSingleAddress)
  .delete(isAuthenticatedUser, deleteAddress)
  .put(isAuthenticatedUser, updateAddress);

//Shipper
router.route("/shipper/login").post(loginShipper);
router.route("/shipper/profile").get(isAuthenticatedShipper, getShipperProfile);
router
  .route("/shipper/profile/update")
  .put(isAuthenticatedShipper, updateProfile);
router
  .route("/shipper/password/update")
  .put(isAuthenticatedShipper, updatePassword);
router.route("/shipper/logout").get(logoutShipper);

module.exports = router;
