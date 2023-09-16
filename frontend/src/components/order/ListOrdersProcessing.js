import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrdersProcessing, clearErrors } from "../../actions/orderActions";

const ListOrdersProcessing = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.myOrdersProcessing
  );

  useEffect(() => {
    dispatch(myOrdersProcessing());

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
  );
};

export default ListOrdersProcessing;
