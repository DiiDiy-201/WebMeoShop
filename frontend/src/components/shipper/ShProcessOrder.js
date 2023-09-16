import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import SidebarShipper from "./SidebarShipper";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  shipperupdateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ShProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();

  //shipper
  const { shipper } = useSelector((state) => state.shipperAuth);

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Đơn hàng cập nhật thành công!");
      dispatch({ type: UPDATE_ORDER_RESET });
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

  const updateOrderHandler = (id) => {
    if (paymentInfo) {
      paymentInfo.paymentMethod === "byHand" && status === "Đã giao hàng"
        ? (paymentInfo.status = true)
        : (paymentInfo.status = false);
    }

    const formData = new FormData();
    formData.set("status", status);

    formData.set("paymentInfo", paymentInfo);

    dispatch(shipperupdateOrder(id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Đơn hàng ${order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarShipper />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around mb-4">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Chi tiết đơn hàng</h2>

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
                    <b>Số điện thoại: </b>{" "}
                    {shippingInfo && shippingInfo.phoneNo}
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
                    <b>Đơn hàng id: </b> {order._id}
                  </p>

                  <p>
                    <b>Ngày giao hàng: </b>
                    {order.orderStatus &&
                    String(order.orderStatus).includes("Đã giao hàng")
                      ? String(order.deliveredAt).substring(0, 10)
                      : "Chưa giao hàng"}
                  </p>

                  <hr />

                  <h4 className="my-4">Thanh toán</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b>
                  </p>

                  {paymentInfo && paymentInfo.paymentMethod === "byCard" ? (
                    <>
                      {" "}
                      <h4 className="my-4">Stripe id</h4>
                      <p className="greenColor">
                        <b>{paymentInfo && paymentInfo.id}</b>
                      </p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <h4 className="my-4">User id</h4>
                      <p className="greenColor">
                        <b>{user && user._id}</b>
                      </p>
                    </>
                  )}

                  {/* <h4 className="my-4">ID thanh toán</h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p> */}

                  <h4 className="my-4">Trạng thái đơn hàng:</h4>
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

                  <h4 className="my-4">Số sản phẩm:</h4>

                  <hr />
                  {/* moi */}
                  <div className="row item-in-cart">
                    <div className="col-4 col-lg-3">
                      <b>
                        <p className="cart-title-table ">Hình ảnh</p>
                      </b>
                    </div>

                    <div className="col-5 col-lg-4">
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
                  </div>

                  <div className="cart-item my-1">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <hr />
                          <div className="col-4 col-lg-3">
                            <img
                              style={{ borderRadius: "5px" }}
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-4">
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
                        </div>
                      ))}
                  </div>
                  {/* <hr /> */}
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Trạng thái</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Nhận đơn</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao hàng">Đã giao hàng</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Cập nhật trạng thái
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ShProcessOrder;
