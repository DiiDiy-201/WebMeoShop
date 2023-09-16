import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import SidebarNhanvien from "./SidebarNhanvien";

import { useDispatch, useSelector } from "react-redux";

import { getNhanvienProducts } from "../../actions/productActions";
import { nhanvienAllOrders } from "../../actions/orderActions";

const DashboardNhanvien = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders, loading } = useSelector((state) => state.allOrders);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getNhanvienProducts());
    dispatch(nhanvienAllOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
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
              <MetaData title={"Nhân viên trang quản trị"} />

              <div className="row pr-4">
                <div className="col-xl-4 col-sm-6 mb-3">
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
                      to="/nhanvien/products"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-4 col-sm-6 mb-3">
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
                      to="/nhanvien/orders"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-4 col-sm-6 mb-3">
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
                      to="/nhanvien/soldout"
                    >
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardNhanvien;
