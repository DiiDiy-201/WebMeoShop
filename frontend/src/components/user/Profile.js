import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Thông tin của tôi"} />

          <h2 className="mt-5 ml-5">
            <i className="fa fa-id-card"></i> Thông tin của tôi
          </h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="eg-btn md--btn primary--btn my-5"
              >
                Cập nhật thông tin
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Tên</h4>
              <p>{user.name}</p>

              <h4>Email</h4>
              <p>{user.email}</p>

              <h4>Số điện thoại</h4>
              <p>{user.phone}</p>

              <h4>Ngày tham gia</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link
                  to="/orders/me"
                  className="btn-block eg-btn md--btn primary--btn mt-5"
                >
                  Đơn hàng
                </Link>
              )}
              <p>
                <Link
                  to="/password/update"
                  className="btn-block eg-btn md--btn primary--btn mt-3"
                >
                  Đổi mật khẩu
                </Link>
              </p>

              <p>
                <Link
                  to="/address/me"
                  className="btn-block eg-btn md--btn primary--btn mt-3"
                >
                  Địa chỉ
                </Link>
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
