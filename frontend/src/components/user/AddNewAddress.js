import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import { createAddress } from "../../actions/addressActions";

import data from "./data.json";

const AddNewAddress = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
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

    const formData = new FormData();
    formData.set("address", address);
    formData.set("city", city);
    formData.set("district", district);
    formData.set("ward", ward);
    formData.set("phoneNo", phoneNo);

    dispatch(createAddress(formData));
    navigate("/cart");
  };

  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Thêm địa chỉ</h1>
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
              className="btn btn-block py-3"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
