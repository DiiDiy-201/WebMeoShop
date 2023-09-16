import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ cart, confirmOrder, payment, success }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {cart ? (
        <Link to="/cart" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Giỏ hàng</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Giỏ hàng</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {/* {shipping ? (
        <Link to="/shipping" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Thông tin giao hàng</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Thông tin giao hàng</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )} */}

      {confirmOrder ? (
        <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Xác nhận đơn hàng</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Xác nhận đơn hàng</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Thanh toán</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Thanh toán</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {success ? (
        <Link to="/success" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Đặt hàng thành công</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Đặt hàng thành công</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
