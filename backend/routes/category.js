const express = require("express");
const {
  newCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategoryDetails,
} = require("../controllers/categoryController");
const router = express.Router();
const {
  // isAuthenticatedUser,
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedNhanvien,
} = require("../middlewares/auth");

router
  .route("/admin/category/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), newCategory);

router.route("/categories").get(getCategory);

router
  .route("/admin/category/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getCategoryDetails)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteCategory)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateCategory);

//nhanvien
router
  .route("/nhanvien/category/new")
  .post(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), newCategory);
router
  .route("/nhanvien/category/:id")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), getCategoryDetails)
  .delete(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), deleteCategory)
  .put(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), updateCategory);

module.exports = router;
