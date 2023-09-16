import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const ProfileAdmin = () => {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <Fragment>
      <MetaData title={"Admin thông tin"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h2 className="mt-5 ml-5">
            <i className="fa fa-id-card"></i> Thông tin của tôi
          </h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={admin.avatar.url}
                  alt={admin.name}
                />
              </figure>
              <Link
                to="/admin/profile/update"
                id="edit_profile"
                className="eg-btn md--btn primary--btn my-5"
              >
                Cập nhật thông tin
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Tên</h4>
              <p>{admin.name}</p>

              <h4>Email</h4>
              <p>{admin.email}</p>

              <h4>Ngày tạo</h4>
              <p>{String(admin.createdAt).substring(0, 10)}</p>

              <p>
                <Link
                  to="/admin/password/update"
                  className="btn-block eg-btn md--btn primary--btn mt-3"
                >
                  Đổi mật khẩu
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileAdmin;
