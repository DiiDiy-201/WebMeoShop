import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import SidebarShipper from "./SidebarShipper";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  shipperallOrderProcessed,
  clearErrors,
} from "../../actions/orderActions";

const ShOrdersProcessed = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, orders } = useSelector(
    (state) => state.allOrderProcessed
  );

  useEffect(() => {
    dispatch(shipperallOrderProcessed());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, navigate]);

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
          label: "Nhận đơn",
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
              to={`/shipper/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Shipper đơn chưa giao"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarShipper />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">
              <i className="fa fa-clock"></i>Đơn hàng chưa giao
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ShOrdersProcessed;
