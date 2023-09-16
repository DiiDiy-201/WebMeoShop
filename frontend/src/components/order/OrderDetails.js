import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  cancelOrder,
  clearErrors,
} from "../../actions/orderActions";

//cancel
import { CANCEL_ORDER_RESET } from "../../constants/orderConstants";

const OrderDetails = () => {
  //cacel
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const params = useParams();

  //shipper
  const { shipper } = useSelector((state) => state.shipperAuth);

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  //cancel
  const { isUpdated } = useSelector((state) => state.cancelOrder);
  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    //cancel
    if (isUpdated) {
      alert.success("Đã hủy đơn hàng thành công");
      dispatch({ type: CANCEL_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city.split("-")[0]}, ${
      shippingInfo.district.split("-")[0]
    }, ${shippingInfo.ward.split("-")[0]}`;

  let isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  // moi;
  if (!isPaid) {
    paymentInfo &&
    paymentInfo.paymentMethod === "byHand" &&
    order.orderStatus === "Đã giao hàng"
      ? (isPaid = true)
      : (isPaid = false);
  }

  //cancel
  const cancelOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(cancelOrder(id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Chi tiết đơn hàng"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <h1 className="my-5 text-center">
              <i className="fa fa-shopping-basket"></i> Chi tiết đơn hàng
            </h1>
            <div
              className="col-12 col-lg-10 mt-5 order-details"
              style={{ borderRight: "1px solid #eaeaea" }}
            >
              <div>
                {order.orderStatus &&
                (String(order.orderStatus).includes("Đang giao") ||
                  String(order.orderStatus).includes("Đã giao hàng")) ? (
                  <Fragment>
                    <h4 className="mb-4">Thông tin shipper</h4>
                    <p>
                      <b>Tên: </b> {shipper && shipper.name}
                    </p>
                    <p>
                      <b>Số điện thoại: </b>
                      {shipper && shipper.phone}
                    </p>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>

              <h4 className="mb-4">Thông tin vận chuyển</h4>
              <p>
                <b>Tên: </b> {user && user.name}
              </p>
              <p>
                <b>Số điện thoại: </b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Địa chỉ: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Tổng tiền: </b>{" "}
                {totalPrice &&
                  totalPrice
                    .toFixed(3)
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
                vnđ
              </p>

              <p>
                <b>Mã đơn hàng: </b>
                {order._id}
              </p>

              <p>
                <b>Ngày nhận hàng: </b>
                {order.orderStatus &&
                String(order.orderStatus).includes("Đã giao hàng")
                  ? String(order.deliveredAt).substring(0, 10)
                  : "Chưa nhận hàng"}
              </p>

              <hr />

              <h4 className="my-4">Số sản phẩm:</h4>
              <hr />
              {/* moi */}
              <div className="row item-in-cart">
                <div className="col-4 col-lg-2">
                  <b>
                    <p className="cart-title-table ">Hình ảnh</p>
                  </b>
                </div>

                <div className="col-5 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Tên sản phẩm</p>
                  </b>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table">Giá</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Số lượng</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Nhận xét</p>
                  </b>
                </div>
              </div>
              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          style={{ borderRadius: "10px" }}
                          src={item.image}
                          alt={item.name}
                          height="55"
                          width="75"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link
                          id="product_name_favourite"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.price} vnđ</p>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>{item.quantity} cái(s)</p>
                      </div>

                      {order.orderStatus &&
                      String(order.orderStatus).includes("Đã giao hàng") ? (
                        <div className="col-4 col-lg-2 mt-lg-0">
                          <Link
                            className="eg-btn md--btn primary--btn"
                            to={`/product/${item.product}`}
                          >
                            Nhận xét
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
              </div>
              {/* <hr /> */}
            </div>
            <div className="col-12 col-lg-2 mt-5 order-details">
              <h4 className="my-4">Thanh toán</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b>
              </p>

              <h4 className="my-4">Trạng thái:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Đã giao hàng")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              {/* cancel */}
              <div className="mt-5">
                {order.orderStatus &&
                String(order.orderStatus).includes("Chờ xác nhận") ? (
                  <Fragment>
                    <h4 className="my-4">Hủy đơn hàng</h4>

                    <div className="form-group">
                      <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>Chọn hủy đơn</option>
                        <option value="Hủy đơn">Hủy đơn hàng</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-danger btn-block"
                      onClick={() => cancelOrderHandler(order._id)}
                    >
                      Xác nhận hủy
                    </button>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
