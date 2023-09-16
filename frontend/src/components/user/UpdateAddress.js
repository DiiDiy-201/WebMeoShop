import React, { useState, useEffect } from "react";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { UPDATE_ADDRESS_RESET } from "../../constants/addressConstants";
import {
  orderAddressDetails,
  updateAddress,
  clearErrors,
} from "../../actions/addressActions";
import Loader from "../layout/Loader";
import data from "./data.json";

const UpdateAddress = () => {
  const {
    orderAddress,
    error,
    loading: load,
  } = useSelector((state) => state.orderAddress);
  const ad = orderAddress && orderAddress.address;
  const ci = orderAddress && orderAddress.city;
  const ph = orderAddress && orderAddress.phoneNo;
  const di = orderAddress && orderAddress.district;
  const wa = orderAddress && orderAddress.ward;
  const [address, setAddress] = useState(`${ad}`);
  const [city, setCity] = useState(`${ci}`);
  const [phoneNo, setPhoneNo] = useState(`${ph}`);
  const [district, setDistrict] = useState(`${di}`);
  const [ward, setWard] = useState(`${wa}`);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const {
    isUpdated,
    error: updateError,
    loading,
  } = useSelector((state) => state.updateAddress);

  const params = useParams();
  const addressId = params.id;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("address", address);
    formData.set("city", city);
    formData.set("district", district);
    formData.set("ward", ward);
    formData.set("phoneNo", phoneNo);

    dispatch(updateAddress(addressId, formData));
  };

  useEffect(() => {
    dispatch(orderAddressDetails(addressId));

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/address/me");
      alert.success("Cập nhật địa chỉ thành công");
      dispatch({ type: UPDATE_ADDRESS_RESET });
    }
  }, [dispatch, alert, error, isUpdated, navigate, updateError, addressId]);

  return (
    <div>
      {load || loading ? (
        <Loader />
      ) : (
        <div>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Cập nhật địa chỉ</h1>
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
                  disabled={loading ? true : false}
                >
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAddress;
