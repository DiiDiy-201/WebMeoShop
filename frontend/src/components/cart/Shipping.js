import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

import data from "./data.json";

const Shipping = ({ history }) => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState("Thành phố Cần Thơ-92");
  const [district, setDistrict] = useState("Quận Ninh Kiều-916");
  const [ward, setWard] = useState("Phường Xuân Khánh-31144");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [selectedDistrict, setSelectedDistrict] = useState([]);

  const [selectedWard, setSelectedWard] = useState([]);

  //moi
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const [, id] = city.split("-");
    const findCity = data.find((item) => item.Id === id);
    if (findCity) {
      setSelectedDistrict(findCity.Districts);
    }
  }, [city]);

  useEffect(() => {
    const [, id] = district.split("-");
    const findWards = selectedDistrict.find((item) => item.Id === id);
    if (findWards) {
      setSelectedWard(findWards.Wards);
    }
  }, [selectedDistrict, district]);
  //moi

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, district, ward }));
    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Thông tin giao hàng"} />

      <CheckoutSteps cart shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h2 className="mb-4">Thông tin giao hàng</h2>
            <div className="form-group">
              <label htmlFor="address_field">Địa chỉ</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">
                Thành phố <span>*</span>
              </label>
              <select
                id="city_field"
                className="form-control"
                value={city}
                onChange={handleChangeCity}
                required
              >
                {data.map((city) => (
                  <option key={city.Name} value={city.Name + "-" + city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">
                Quận / Huyện <span>*</span>
              </label>
              <select
                id="postal_code_field"
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                {selectedDistrict &&
                  selectedDistrict.length &&
                  selectedDistrict.map((item) => (
                    <option key={item.Id} value={item.Name + "-" + item.Id}>
                      {item.Name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="country_field">
                Phường / Xã <span>*</span>
              </label>
              <select
                id="country_field"
                className="form-control"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                required
              >
                {selectedWard &&
                  selectedWard.length &&
                  selectedWard.map((item) => (
                    <option key={item.Id} value={item.Name + "-" + item.Id}>
                      {item.Name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Số điện thoại</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn-block eg-btn md--btn primary--btn py-3"
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
