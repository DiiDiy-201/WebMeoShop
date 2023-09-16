import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import Loader from "../layout/Loader";

import { useSelector, useDispatch } from "react-redux";

//address
import { saveShippingInfo } from "../../actions/cartActions";
import { orderAddressDetails } from "../../actions/addressActions";

const ConfirmOrder = () => {
  //address
  const dispatch = useDispatch();
  const { orderAddress, loading } = useSelector((state) => state.orderAddress);
  const params = useParams();
  const id = params.id;

  //shippingInfo
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Calculate Order Price
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 20;
  const totalPrice = itemsPrice + shippingPrice;

  //address
  const address = orderAddress && orderAddress.address;
  const city = orderAddress && orderAddress.city;
  const district = orderAddress && orderAddress.district;
  const ward = orderAddress && orderAddress.ward;
  const phoneNo = orderAddress && orderAddress.phoneNo;

  const processToPayment = () => {
    dispatch(saveShippingInfo({ address, city, district, ward, phoneNo }));
    const data = {
      itemsPrice: itemsPrice.toFixed(3),
      shippingPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    dispatch(orderAddressDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      <MetaData title={"Xác nhận đơn hàng"} />

      <CheckoutSteps cart confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h4 className="mb-3">Thông tin giao hàng</h4>
              <p>
                <b>Tên: </b> {user && user.name}
              </p>
              <p>
                <b>Số điện thoại: </b> {orderAddress && orderAddress.phoneNo}
              </p>
              <p className="mb-4">
                <b>Địa chỉ:</b>{" "}
                {`${orderAddress && orderAddress.address}, ${
                  orderAddress && orderAddress.ward.split("-")[0]
                }, ${orderAddress && orderAddress.district.split("-")[0]}, ${
                  orderAddress && orderAddress.city.split("-")[0]
                }`}
              </p>

              <hr />
              <h4 className="mt-4">Sản phẩm: ({cartItems.length})</h4>

              {/* moi */}
              <hr />
              <div className="row">
                <div className="col-4 col-lg-2">
                  <b>
                    <p className="cart-title-table ">Hình ảnh</p>
                  </b>
                </div>

                <div className="col-4 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Tên sản phẩm</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Giá</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Số lượng</p>
                  </b>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Thành tiền</p>
                  </b>
                </div>
              </div>
              {/* moi */}

              {cartItems.map((item) => (
                <div className="cart-item my-1" key={item.product}>
                  <hr />
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        style={{ borderRadius: "5px" }}
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className=" col-4 col-lg-3">
                      <Link
                        id="product_name_favourite"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p className="" id="card_item_price">
                        {item.price} vnđ
                      </p>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p className="" id="card_item_price">
                        {item.quantity} cái
                      </p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p className="" id="card_item_price">
                        {(item.quantity * item.price)
                          .toFixed(3)
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        vnđ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Thông tin thanh toán</h4>
            <hr />
            <p>
              Thành tiền:
              <span className="order-summary-values">
                {itemsPrice
                  .toFixed(3)
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
                vnđ
              </span>
            </p>
            {/* moi */}
            {shippingPrice ? (
              <p>
                Phí giao hàng:{" "}
                <span className="order-summary-values">
                  {shippingPrice}
                  vnđ
                </span>
              </p>
            ) : (
              <p>
                Phí giao hàng:{" "}
                <span className="order-summary-values">Miễn phí</span>
              </p>
            )}
            {/* moi */}

            <hr />

            <p>
              Tổng tiền:{" "}
              <span className="order-summary-values">
                {totalPrice
                  .toFixed(3)
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
                vnđ
              </span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              // className="btn btn-primary btn-block"
              className="btn-block eg-btn md--btn primary--btn"
              onClick={processToPayment}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
