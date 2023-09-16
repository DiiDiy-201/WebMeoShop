// Layouts
import { AdminLayout } from "../components/Layouts";
import { NhanvienLayouts } from "../components/Layouts";
import { HomeLayout } from "../components/Layouts";
import { ShipperLayout } from "../components/Layouts";

//Pages
import Home from "../components/home/Home";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import Profile from "../components/user/Profile";
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import ForgotPassword from "../components/user/ForgotPassword";
import NewPassword from "../components/user/NewPassword";
import AddNewAddress from "../components/user/AddNewAddress";
import AddressManage from "../components/user/AddressManage";
import UpdateAddress from "../components/user/UpdateAddress";

//product
import ProductDetails from "../components/product/ProductDetails";

//cart
import Cart from "../components/cart/Cart";
// import Shipping from "../components/cart/Shipping";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import Payment from "../components/cart/Payment";
import OrderSuccess from "../components/cart/OrderSuccess";

//order
import ListOrders from "../components/order/ListOrders";
import OrderDetails from "../components/order/OrderDetails";

import Contact from "../components/contact/Contact";
import About from "../components/about/About";
import Favourites from "../components/favourite/Favourites";

//admin
import LoginAdmin from "../components/admin/LoginAdmin";
import Dashboard from "../components/admin/Dashboard";
import ProductsList from "../components/admin/ProductsList";
import NewProduct from "../components/admin/NewProduct";
import UpdateProduct from "../components/admin/UpdateProduct";
import SoldOutList from "../components/admin/SoldOutList";
import OrdersList from "../components/admin/OrdersList";
import ProcessOrder from "../components/admin/ProcessOrder";
import UsersList from "../components/admin/UsersList";
import UpdateUser from "../components/admin/UpdateUser";
import ProfileAdmin from "../components/admin/ProfileAdmin";
import UpdateProfileAdmin from "../components/admin/UpdateProfileAdmin";
import UpdatePasswordAdmin from "../components/admin/UpdatePasswordAdmin";
import ProductReviews from "../components/admin/ProductReviews";
import CatagoryList from "../components/admin/CatagoryList";
import NewCategory from "../components/admin/NewCategory";
import UpdateCategory from "../components/admin/UpdateCategory";
import AdminAnalytics from "../components/analytics/AdminAnalytics";
import CreateNhanvien from "../components/admin/CreateNhanvien";
import NhanvienList from "../components/admin/NhanvienList";
import KhachList from "../components/admin/KhachList";

//nhanvien
import LoginNhanvien from "../components/nhanvien/LoginNhanvien";
import DashboardNhanvien from "../components/nhanvien/DashboardNhanvien";
import NvProductsList from "../components/nhanvien/NvProductsList";
import NvNewProduct from "../components/nhanvien/NvNewProduct";
import NvUpdateProduct from "../components/nhanvien/NvUpdateProduct";
import NvSoldOutList from "../components/nhanvien/NvSoldOutList";
import NvOrdersList from "../components/nhanvien/NvOrdersList";
import NvProcessOrder from "../components/nhanvien/NvProcessOrder";
import ProfileNhanvien from "../components/nhanvien/ProfileNhanvien";
import UpdateProfileNhanvien from "../components/nhanvien/UpdateProfileNhanvien";
import UpdatePasswordNhanvien from "../components/nhanvien/UpdatePasswordNhanvien";
import NvCatagoryList from "../components/nhanvien/NvCatagoryList";
import NvNewCategory from "../components/nhanvien/NvNewCategory";
import NvUpdateCategory from "../components/nhanvien/NvUpdateCategory";

//shipper
import LoginShipper from "../components/shipper/LoginShipper";
import DashboardShipper from "../components/shipper/DashboardShipper";
import ShOrdersProcessed from "../components/shipper/ShOrdersProcessed";
import ShOrdersShipping from "../components/shipper/ShOrdersShipping";
import ShOrdersShipped from "../components/shipper/ShOrdersShipped";
import ShProcessOrder from "../components/shipper/ShProcessOrder";
import ProfileShipper from "../components/shipper/ProfileShipper";
import UpdateProfileShipper from "../components/shipper/UpdateProfileShipper";
import UpdatePasswordShipper from "../components/shipper/UpdatePasswordShipper";

//Public Routes
const publicRoutes = [
  { path: "/", component: Home, layout: HomeLayout },
  { path: "/search/:keyword", component: Home, layout: HomeLayout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/password/forgot", component: ForgotPassword },
  { path: "/password/reset/:token", component: NewPassword },
  { path: "/address/new", component: AddNewAddress },
  { path: "/address/me", component: AddressManage },
  { path: "/address/update/:id", component: UpdateAddress },
  { path: "/admin/login", component: LoginAdmin, layout: null },
  { path: "/nhanvien/login", component: LoginNhanvien, layout: null },
  { path: "/shipper/login", component: LoginShipper, layout: null },
  { path: "/product/:id", component: ProductDetails },
  // cart
  { path: "/cart", component: Cart },

  { path: "/contact", component: Contact, layout: HomeLayout },
  { path: "/about", component: About },
  { path: "/favourites", component: Favourites },
];

const privateRoutes = [
  { path: "/me", component: Profile },
  { path: "/me/update", component: UpdateProfile },
  { path: "/password/update", component: UpdatePassword },
  //cart
  // { path: "/shipping", component: Shipping },
  { path: "/confirm/:id", component: ConfirmOrder },
  { path: "/success", component: OrderSuccess },
  //order
  { path: "/orders/me", component: ListOrders },
  { path: "/order/:id", component: OrderDetails },
];

const paymentRoutes = [{ path: "/payment", component: Payment }];

const adminPrivateRoutes = [
  { path: "/admin/dashboard", component: Dashboard, layout: AdminLayout },
  { path: "/admin/products", component: ProductsList, layout: AdminLayout },
  { path: "/admin/product", component: NewProduct, layout: AdminLayout },
  { path: "/admin/product/:id", component: UpdateProduct, layout: AdminLayout },
  { path: "/admin/soldout", component: SoldOutList, layout: AdminLayout },
  { path: "/admin/orders", component: OrdersList, layout: AdminLayout },
  { path: "/admin/order/:id", component: ProcessOrder, layout: AdminLayout },
  { path: "/admin/users", component: UsersList, layout: AdminLayout },
  { path: "/admin/khachs", component: KhachList, layout: AdminLayout },
  { path: "/admin/user/:id", component: UpdateUser, layout: AdminLayout },
  { path: "/admin/profile", component: ProfileAdmin, layout: AdminLayout },
  {
    path: "/admin/profile/update",
    component: UpdateProfileAdmin,
    layout: AdminLayout,
  },
  {
    path: "/admin/password/update",
    component: UpdatePasswordAdmin,
    layout: AdminLayout,
  },
  { path: "/admin/reviews", component: ProductReviews, layout: AdminLayout },
  { path: "/admin/categories", component: CatagoryList, layout: AdminLayout },
  { path: "/admin/category", component: NewCategory, layout: AdminLayout },
  {
    path: "/admin/category/:id",
    component: UpdateCategory,
    layout: AdminLayout,
  },
  { path: "/admin/analytics", component: AdminAnalytics, layout: AdminLayout },
  { path: "/admin/nhanviens", component: NhanvienList, layout: AdminLayout },
  { path: "/admin/nhanvien", component: CreateNhanvien, layout: AdminLayout },
];

const nhanvienPrivateRoutes = [
  {
    path: "/nhanvien/dashboard",
    component: DashboardNhanvien,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/products",
    component: NvProductsList,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/product",
    component: NvNewProduct,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/product/:id",
    component: NvUpdateProduct,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/soldout",
    component: NvSoldOutList,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/orders",
    component: NvOrdersList,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/order/:id",
    component: NvProcessOrder,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/profile",
    component: ProfileNhanvien,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/profile/update",
    component: UpdateProfileNhanvien,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/password/update",
    component: UpdatePasswordNhanvien,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/categories",
    component: NvCatagoryList,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/category",
    component: NvNewCategory,
    layout: NhanvienLayouts,
  },
  {
    path: "/nhanvien/category/:id",
    component: NvUpdateCategory,
    layout: NhanvienLayouts,
  },
];

const shipperPrivateRoutes = [
  {
    path: "/shipper/dashboard",
    component: DashboardShipper,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/orders/processed",
    component: ShOrdersProcessed,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/orders/shipping",
    component: ShOrdersShipping,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/orders/shipped",
    component: ShOrdersShipped,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/order/:id",
    component: ShProcessOrder,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/profile",
    component: ProfileShipper,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/profile/update",
    component: UpdateProfileShipper,
    layout: ShipperLayout,
  },
  {
    path: "/shipper/password/update",
    component: UpdatePasswordShipper,
    layout: ShipperLayout,
  },
];

export {
  publicRoutes,
  privateRoutes,
  paymentRoutes,
  adminPrivateRoutes,
  nhanvienPrivateRoutes,
  shipperPrivateRoutes,
};
