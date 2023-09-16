import React, { Fragment, useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

//new1
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  //moi
  const [paymentMethod, setPaymentMethod] = useState("byHand");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  //moi
  const submitRef = useRef();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : null;
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 1000),
  };

  //moi
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    //moi
    // manage payment by card
    if (paymentMethod === "byCard") {
      let res;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        res = await axios.post("/api/v1/payment/process", paymentData, config);

        const clientSecret = res.data.client_secret;

        console.log(clientSecret);

        if (!stripe || !elements) {
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        });

        if (result.error) {
          alert.error(result.error.message);
          // document.querySelector("#pay_btn").disabled = false;
          submitRef.current.disabled = false;
        } else {
          // The payment is processed or not
          if (result.paymentIntent.status === "succeeded") {
            // New Order
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
              paymentMethod,
            };

            alert.success("Thanh toán thành công");

            dispatch(createOrder(order));

            navigate("/success");
          } else {
            alert.error("Có một số vấn đề trong khi xử lý thanh toán");
          }
        }
      } catch (error) {
        // document.querySelector("#pay_btn").disabled = false;
        submitRef.current.disabled = false;
        alert.error(error.response.data.message);
      }
    }
    //manage payment by hand
    else {
      order.paymentInfo = {
        id: user._id,
        status: "incomplete",
        paymentMethod,
      };

      alert.success("Thanh toán thành công");

      dispatch(createOrder(order));
      navigate("/success");
    }
  };

  //new1
  const virtualCards = [
    "4242424242424242",
    "4000056655665556",
    "5555555555554444",
    "5200828282828210",
    "6011111111111117",
    "6011000990139424",
  ];
  // const [data, setData] = React.useState({ cvc: "654" });
  // const [focus, setFocus] = React.useState("");

  // const handleFocus = (e) => {
  //   setFocus("cvc");
  // };
  // const handleInputChange = (e) => setData({ ...data, data: e.target.value });

  return (
    <Fragment>
      <MetaData title="Thanh toán" />

      <CheckoutSteps cart confirmOrder payment />

      {/* SELECT PAYMENT METHOD */}
      <div className="d-flex mt-5 justify-content-center">
        <div className="form-check me-5 form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="payment-method"
            value="byCard"
            checked={paymentMethod === "byCard"}
            onChange={handlePaymentChange}
            id="card-payment"
          />
          <label className="form-check-label" htmlFor="card-payment">
            Trả bằng thẻ
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="payment-method"
            id="delivery-payment"
            value="byHand"
            checked={paymentMethod === "byHand"}
            onChange={handlePaymentChange}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="delivery-payment">
            Trả khi nhận hàng
          </label>
        </div>
      </div>

      {/* RENDER CONTENT BASED ON SELECTED PAYMENT METHOD */}
      <div className="row mx-0 mb-5 wrapper justify-content-center">
        <div className="col-10 col-lg-5">
          {paymentMethod === "byHand" ? (
            <form onSubmit={submitHandler} className="shadow-lg">
              <h5>
                Tổng tiền:{" "}
                {`${(orderInfo && orderInfo.totalPrice)
                  .toFixed(3)
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}{" "}
                vnđ
              </h5>
              <h5>Thanh toán khi nhận hàng</h5>
              <button
                ref={submitRef}
                id="pay_btn"
                type="submit"
                className="btn-block px-5 eg-btn md--btn primary--btn py-3"
              >
                Đặt hàng
              </button>
            </form>
          ) : (
            <form onSubmit={submitHandler} className="shadow-lg">
              <h1 className="mb-4">Thông tin thẻ</h1>

              <div className="col-md-offset-2 mb-4">
                <Cards
                  // cvc={data.cvc}
                  expiry={"12/26"}
                  // focused={focus}
                  name={user.name}
                  number={
                    virtualCards[
                      Math.floor(Math.random() * virtualCards.length)
                    ]
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_num_field">Số thẻ</label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_exp_field">Hết hạn thẻ</label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_cvc_field">CVC</label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control"
                  options={options}
                  // onChange={handleInputChange}
                  // onFocus={handleFocus}
                />
              </div>

              <button
                ref={submitRef}
                id="pay_btn"
                type="submit"
                // className="btn btn-block py-3"
                className="btn-block eg-btn md--btn primary--btn"
              >
                Thanh toán{" "}
                {` - ${(orderInfo && orderInfo.totalPrice)
                  .toFixed(3)
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}{" "}
                vnđ
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
