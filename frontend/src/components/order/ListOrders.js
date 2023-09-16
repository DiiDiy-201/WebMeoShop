import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

import ListOrdersProcessing from "./ListOrdersProcessing";
import ListOrdersCancel from "./ListOrdersCancel";
import ListOrdersProcessed from "./ListOrdersProcessed";
import ListOrdersShipping from "./ListOrdersShipping";
import ListOrdersShipped from "./ListOrdersShipped";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Mã đơn hàng",
          field: "id",
          sort: "asc",
        },
        {
          label: "Ngày đặt hàng",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Số sản phẩm",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Tổng tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "status",
          sort: "asc",
        },
        {
          label: "Ngày nhận hàng",
          field: "deliveredAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        createdAt: String(order.createdAt).substring(0, 10),
        numOfItems: order.orderItems.length,
        amount: `${order.totalPrice
          .toFixed(3)
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} vnđ`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Đã giao hàng") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        deliveredAt:
          order.orderStatus &&
          String(order.orderStatus).includes("Đã giao hàng") ? (
            <p style={{ color: "green" }}>
              {String(order.deliveredAt).substring(0, 10)}
            </p>
          ) : (
            <p style={{ color: "red" }}>Chưa nhận hàng</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="Đơn hàng của bạn" />

      <h1 className="my-5 text-center">
        <i className="fa fa-shopping-basket"></i> Đơn hàng của bạn
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="pills-allorders-tab"
                data-toggle="pill"
                href="#pills-allorders"
                role="tab"
                aria-controls="pills-allorders"
                aria-selected="true"
              >
                Tất cả đơn hàng
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-ordersprocessing-tab"
                data-toggle="pill"
                href="#pills-ordersprocessing"
                role="tab"
                aria-controls="pills-ordersprocessing"
                aria-selected="false"
              >
                Chờ xác nhận
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-ordersprocessed-tab"
                data-toggle="pill"
                href="#pills-ordersprocessed"
                role="tab"
                aria-controls="pills-ordersprocessed"
                aria-selected="false"
              >
                Đã xác nhận
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-ordersshipping-tab"
                data-toggle="pill"
                href="#pills-ordersshipping"
                role="tab"
                aria-controls="pills-ordersshipping"
                aria-selected="false"
              >
                Đang giao
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-shipped-tab"
                data-toggle="pill"
                href="#pills-shipped"
                role="tab"
                aria-controls="pills-shipped"
                aria-selected="false"
              >
                Đã giao hàng
              </a>
            </li>

            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-cancel-tab"
                data-toggle="pill"
                href="#pills-cancel"
                role="tab"
                aria-controls="pills-cancel"
                aria-selected="false"
              >
                Đơn hủy
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-allorders"
              role="tabpanel"
              aria-labelledby="pills-allorders-tab"
            >
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            </div>
            <div
              className="tab-pane fade"
              id="pills-ordersprocessing"
              role="tabpanel"
              aria-labelledby="pills-ordersprocessing-tab"
            >
              <ListOrdersProcessing />
            </div>
            <div
              className="tab-pane fade"
              id="pills-ordersprocessed"
              role="tabpanel"
              aria-labelledby="pills-ordersprocessed-tab"
            >
              <ListOrdersProcessed />
            </div>
            <div
              className="tab-pane fade"
              id="pills-ordersshipping"
              role="tabpanel"
              aria-labelledby="pills-ordersshipping-tab"
            >
              <ListOrdersShipping />
            </div>
            <div
              className="tab-pane fade"
              id="pills-shipped"
              role="tabpanel"
              aria-labelledby="pills-shipped-tab"
            >
              <ListOrdersShipped />
            </div>

            <div
              className="tab-pane fade"
              id="pills-cancel"
              role="tabpanel"
              aria-labelledby="pills-cancel-tab"
            >
              <ListOrdersCancel />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListOrders;
