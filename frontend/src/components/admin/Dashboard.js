import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers, userSales } from "../../actions/userActions";

//sales chart
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import {
  monthlySalesChart,
  productSalesChart,
} from "../../actions/chartActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  //sales chart
  const { customerSales } = useSelector((state) => state.customerSales);
  const { salesPerMonth } = useSelector((state) => state.salesPerMonth);
  const { productSales } = useSelector((state) => state.productSales);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(userSales());
    dispatch(monthlySalesChart());
    dispatch(productSalesChart());
  }, [dispatch]);

  //moi
  // let allTotalQty = 0;
  // orders &&
  //   orders.map((order) => {
  //     if (order.orderStatus === "Đã giao hàng") {
  //       let a = order.orderItems.reduce(
  //         (total, item) => total + item.quantity,
  //         0
  //       );
  //       allTotalQty += a;
  //     }
  //     return allTotalQty;
  //     //moi them
  //   });

  // function count(array) {
  //   const resultArray = [];
  //   array &&
  //     array.forEach((element) => {
  //       if (element.orderItems && element.orderItems.length) {
  //         const orderItems = element.orderItems;
  //         orderItems.forEach((orderItem) => {
  //           const foundItemIdx = resultArray.findIndex((e) => {
  //             if (!e || !e.product) return -1;
  //             return e.product === orderItem.product;
  //           });

  //           if (foundItemIdx !== -1) {
  //             resultArray[foundItemIdx].quantity += orderItem.quantity;
  //           } else {
  //             resultArray.push({
  //               product: orderItem.product,
  //               quantity: orderItem.quantity,
  //               name: orderItem.name,
  //               image: orderItem.image,
  //             });
  //           }
  //         });
  //       }
  //     });
  //   return resultArray;
  // }

  // let maxObj = count(orders).reduce(
  //   (max, obj) => (max.quantity > obj.quantity ? max : obj),
  //   0
  // );
  // let minObj = count(orders).reduce(
  //   (min, obj) => (min.quantity < obj.quantity ? min : obj),
  //   0
  // );

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">
            <img className="title-img" src="/images/admin/switch.svg"></img>
            Bảng điều khiển
          </h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin trang quản trị"} />

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-black bg-light o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Doanh thu
                        <br />{" "}
                        <b>
                          {totalAmount &&
                            totalAmount
                              .toFixed(3)
                              .replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                "."
                              )}{" "}
                          vnđ
                        </b>
                      </div>
                      <img src="/images/admin/dollar.svg"></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-black bg-light o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Sản phẩm
                        <br /> <b>{products && products.length}</b>
                      </div>
                      <img src="/images/admin/ipad.svg"></img>
                    </div>
                    <Link
                      className="card-footer text-black clearfix small z-1"
                      to="/admin/products"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-black bg-light o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Đơn hàng
                        <br /> <b>{orders && orders.length}</b>
                      </div>
                      <img src="/images/admin/price-list.svg"></img>
                    </div>
                    <Link
                      className="card-footer text-black clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-black bg-light o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Thành viên
                        <br /> <b>{users && users.length}</b>
                      </div>
                      <img src="/images/admin/man.svg"></img>
                    </div>
                    <Link
                      className="card-footer text-black clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-black bg-light o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Số sản phẩm hết hàng
                        <br /> <b>{outOfStock}</b>
                      </div>
                      <img src="/images/admin/open.svg"></img>
                    </div>
                    <Link
                      className="card-footer text-black clearfix small z-1"
                      to="/admin/soldout"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="row pr-4">
                <div className="col-xl-4 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Sản phẩm được mua nhiều nhất
                        <br /> <b>{maxObj.quantity}</b>
                      </div>
                      <img src="/images/admin/commission.svg"></img>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Sản phẩm được mua ít nhất
                        <br /> <b>{minObj.quantity}</b>
                      </div>
                      <img src="/images/admin/pen.svg"></img>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="item-db card-body">
                      <div className="text-center card-font-size">
                        Tổng sản phẩm đã bán
                        <br /> <b>{allTotalQty}</b>
                      </div>
                      <img src="/images/admin/commission.svg"></img>
                    </div>
                  </div>
                </div>
              </div> */}

              <Fragment>
                <UserSalesChart data={customerSales} />
              </Fragment>
              <Fragment>
                <MonthlySalesChart data={salesPerMonth} />
              </Fragment>
              <Fragment>
                <ProductSalesChart data={productSales} />
              </Fragment>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
