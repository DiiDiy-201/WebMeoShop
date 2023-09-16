import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MetaData from "../layout/MetaData";
import SidebarNhanvien from "./SidebarNhanvien";

const ProfileNhanvien = () => {
  const { nhanvien } = useSelector((state) => state.nhanvienAuth);

  return (
    <Fragment>
      <MetaData title={"Nhân viên thông tin"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
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
                  src={nhanvien.avatar.url}
                  alt={nhanvien.name}
                />
              </figure>
              <Link
                to="/nhanvien/profile/update"
                id="edit_profile"
                className="eg-btn md--btn primary--btn my-5"
              >
                Cập nhật thông tin
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Tên</h4>
              <p>{nhanvien.name}</p>

              <h4>Email</h4>
              <p>{nhanvien.email}</p>

              <h4>Số điện thoại</h4>
              <p>{nhanvien.phone}</p>

              <h4>Ngày tham gia</h4>
              <p>{String(nhanvien.createdAt).substring(0, 10)}</p>

              <p>
                <Link
                  to="/nhanvien/password/update"
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

export default ProfileNhanvien;
