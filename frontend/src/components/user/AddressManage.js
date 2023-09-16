import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteAddress,
  myAddress,
} from "../../actions/addressActions";

import { DELETE_ADDRESS_RESET } from "../../constants/addressConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const AddressManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    shippingData = [],
    loading,
    error,
  } = useSelector((state) => state.shippingData);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.updateAddress
  );
  useEffect(() => {
    dispatch(myAddress());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Xóa địa chỉ thành công");
      navigate("/address/me");
      dispatch({ type: DELETE_ADDRESS_RESET });
    }
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

  const deleteAddressHandler = (id) => {
    if (window.confirm(`Xóa địa chỉ ?`)) {
      dispatch(deleteAddress(id));
    }
  };

  const setAddress = () => {
    const data = {
      columns: [
        {
          label: "Địa chỉ",
          field: "address",
          sort: "asc",
        },
        {
          label: "Xã/Phường",
          field: "ward",
          sort: "asc",
        },
        {
          label: "Quận/Huyện",
          field: "district",
          sort: "asc",
        },
        {
          label: "Tỉnh/TP",
          field: "city",
          sort: "asc",
        },
        {
          label: "Số điện thoại",
          field: "phoneno",
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

    shippingData.forEach((shippingInfo) => {
      data.rows.push({
        address: `${shippingInfo.address}`,
        ward: shippingInfo.ward.split("-")[0],
        district: shippingInfo.district.split("-")[0],
        city: shippingInfo.city.split("-")[0],
        phoneno: shippingInfo.phoneNo,

        actions: (
          <div className="mx-auto">
            <Link
              to={`/address/update/${shippingInfo._id}`}
              className="btn btn-primary mx-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteAddressHandler(shippingInfo._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };
  return (
    <div>
      <MetaData title={"Địa chỉ của tui"} />

      <h1 className="my-5">Địa chỉ</h1>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Link to={`/address/new`} className="btn btn-success mx-2">
            {/* <i className="fa fa-plus"></i> */}
            Thêm địa chỉ
          </Link>
          <MDBDataTable
            data={setAddress()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      )}
    </div>
  );
};

export default AddressManage;
