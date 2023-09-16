import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

import { uid } from "uid";

//address
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { myAddress, clearErrors } from "../../actions/addressActions";

const Cart = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  //address
  const alert = useAlert();
  const {
    loading,
    error,
    shippingData = [],
  } = useSelector((state) => state.shippingData);
  const [radio, setRadio] = useState("");

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  // const checkoutHandler = () => {
  //   navigate("/shipping");
  // };

  //moi
  const generateKey = () => {
    return uid(16);
  };
  //moi

  //address
  const checkoutHandler = () => {
    if (radio === "") {
      navigate("/cart");
      alert.error("Vui lòng chọn địa chỉ");
    } else {
      navigate(`/confirm/${radio}`);
    }
  };

  const submitHandler = () => {
    navigate("/address/me");
  };
  useEffect(() => {
    dispatch(myAddress());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/login");
    }
  }, [dispatch, alert, error, navigate]);

  return (
    //moi
    <Fragment>
      <MetaData title={"Giỏ hàng"} />
      {cartItems.length === 0 ? (
        <Fragment>
          <h2 className="mt-5 text-center">Giỏ hàng chưa có sản phẩm</h2>
          <div className="text-center">
            <Link to="/" className="eg-btn md--btn primary--btn">
              Trở về
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            <span className="fa fa-shopping-basket"></span>
            Giỏ hàng: <b>{cartItems.length} sản phẩm</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div
              style={{ borderRight: "1px solid #eaeaea" }}
              className="col-12 col-lg-8"
            >
              <hr />
              <div className="row item-in-cart">
                <div className="col-4 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Hình ảnh</p>
                  </b>
                </div>

                <div className="col-5 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Tên sản phẩm</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table">Giá</p>
                  </b>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Số lượng</p>
                  </b>
                </div>

                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Xóa</p>
                  </b>
                </div>
              </div>

              {cartItems.map((item) => (
                <Fragment key={generateKey()}>
                  <hr />

                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          style={{ borderRadius: "10px" }}
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
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

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.price} vnđ</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() =>
                            removeItemFromCartHandler(item.product)
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  {/* <hr /> */}
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h5>Thông tin thanh toán</h5>
                <hr />
                <p>
                  Tổng mặt hàng:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                  </span>
                </p>
                <p>
                  Thành tiền:{" "}
                  <span className="order-summary-values">
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
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
                  onClick={checkoutHandler}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8  adress-details">
                <h4 className="mb-4">
                  <b>Địa chỉ</b>
                </h4>
                {shippingData &&
                  shippingData.map((address) => (
                    <div key={address._id}>
                      <p>
                        <input
                          style={{ width: "auto" }}
                          type="radio"
                          value={address._id}
                          onChange={(e) => setRadio(e.target.value)}
                          name="addressid"
                        />
                        <b className="ml-3">Số điện thoại: </b>
                        {address.phoneNo}
                      </p>

                      <p className="ml-4">
                        <b>Địa chỉ: </b>
                        {address.address}, {address.ward.split("-")[0]},{" "}
                        {address.district.split("-")[0]},{" "}
                        {address.city.split("-")[0]}
                      </p>
                    </div>
                  ))}
                <button className="btn review-btn" onClick={submitHandler}>
                  Địa chỉ mới
                </button>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
    //moi
  );
};

export default Cart;
