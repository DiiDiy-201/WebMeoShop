const express = require("express");

const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductsReviews,
  deleteReview,
  getAdminProducts,
  getTopProducts,
  getRelatedProducts,
  getSoldOutProducts,
  productSales,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedNhanvien,
} = require("../middlewares/auth");

router.route("/products").get(getProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/admin/soldout").get(getSoldOutProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), newProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductsReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

// code moi them vao
router.route("/products/top").get(getTopProducts);
router.route("/relatedproducts").get(getRelatedProducts);

router.route("/admin/products/sales").get(productSales);

// code moi them vao

//NHANVIEN
router
  .route("/nhanvien/products")
  .get(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), getAdminProducts);
router
  .route("/nhanvien/product/:id")
  .put(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), updateProduct)
  .delete(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), deleteProduct);
router
  .route("/nhanvien/product/new")
  .post(isAuthenticatedNhanvien, authorizeRoles("nhanvien"), newProduct);
router.route("/nhanvien/soldout").get(getSoldOutProducts);

module.exports = router;
