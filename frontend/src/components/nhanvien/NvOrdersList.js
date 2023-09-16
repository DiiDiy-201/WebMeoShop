import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import SidebarNhanvien from "./SidebarNhanvien";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  nhanvienAllOrders,
  nhanviendeleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

//moi
import NvOrdersProcessing from "./orderfilters/NvOrdersProcessing";
import NvOrdersCancel from "./orderfilters/NvOrdersCancel";
import NvOrdersProcessed from "./orderfilters/NvOrdersProcessed";
import NvOrdersShipping from "./orderfilters/NvOrdersShipping";
import NvOrdersShipped from "./orderfilters/NvOrdersShipped";

const NvOrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(nhanvienAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa đơn hàng thành công");
      navigate("/nhanvien/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(nhanviendeleteOrder(id));
  };

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
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Giá",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        createdAt: String(order.createdAt).substring(0, 10),
        numofItems: order.orderItems.length,
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
        actions: (
          <Fragment>
            <Link
              to={`/nhanvien/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  //moi
  let orderShipped = 0;
  orders &&
    orders.map((order) => {
      if (order.orderStatus === "Đã giao hàng") {
        orderShipped += 1;
      }
      return orderShipped;
    });

  let orderShipping = 0;
  orders &&
    orders.map((order) => {
      if (order.orderStatus === "Đang giao") {
        orderShipping += 1;
      }
      return orderShipping;
    });

  let orderProcessing = 0;
  orders &&
    orders.map((order) => {
      if (order.orderStatus === "Chờ xác nhận") {
        orderProcessing += 1;
      }
      return orderProcessing;
    });

  let orderCancel = 0;
  orders &&
    orders.map((order) => {
      if (order.orderStatus === "Hủy đơn") {
        orderCancel += 1;
      }
      return orderCancel;
    });

  let orderProcessed = 0;
  orders &&
    orders.map((order) => {
      if (order.orderStatus === "Đã xác nhận") {
        orderProcessed += 1;
      }
      return orderProcessed;
    });
  //moi

  return (
    <Fragment>
      <MetaData title={"Nhân viên quản lý đơn hàng"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">
              <i className="fa fa-shopping-basket"></i>Quản lý đơn hàng
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
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
                      Tất cả đơn hàng ({orders && orders.length})
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
                      Chờ xác nhận ({orderProcessing})
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
                      Đã xác nhận ({orderProcessed})
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
                      Đang giao ({orderShipping})
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
                      Đã giao hàng ({orderShipped})
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
                      Đơn hủy ({orderCancel})
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
                    <NvOrdersProcessing />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-ordersprocessed"
                    role="tabpanel"
                    aria-labelledby="pills-ordersprocessed-tab"
                  >
                    <NvOrdersProcessed />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-ordersshipping"
                    role="tabpanel"
                    aria-labelledby="pills-ordersshipping-tab"
                  >
                    <NvOrdersShipping />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-shipped"
                    role="tabpanel"
                    aria-labelledby="pills-shipped-tab"
                  >
                    <NvOrdersShipped />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-cancel"
                    role="tabpanel"
                    aria-labelledby="pills-cancel-tab"
                  >
                    <NvOrdersCancel />
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NvOrdersList;
