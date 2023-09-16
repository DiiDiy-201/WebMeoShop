import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import SidebarNhanvien from "./SidebarNhanvien";

import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileNhanvien,
  loadNhanvien,
  clearErrors,
} from "../../actions/nhanvienActions";
import { UPDATE_PROFILE_NHANVIEN_RESET } from "../../constants/nhanvienConstants";

const UpdateProfileNhanvien = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { nhanvien } = useSelector((state) => state.nhanvienAuth);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.nhanvienprofile
  );

  useEffect(() => {
    if (nhanvien) {
      setName(nhanvien.name);
      setEmail(nhanvien.email);
      setPhone(nhanvien.phone);
      setAvatarPreview(nhanvien.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật thông tin thành công");
      dispatch(loadNhanvien());

      navigate("/nhanvien/profile");

      dispatch({
        type: UPDATE_PROFILE_NHANVIEN_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, navigate, nhanvien]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("avatar", avatar);

    dispatch(updateProfileNhanvien(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Cập nhật thông tin"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mt-2 mb-5">Cập nhật thông tin</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Tên</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_field">Số điện thoại</label>
                  <input
                    type="phone"
                    id="phone_field"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Chọn ảnh đại diện
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-block eg-btn md--btn primary--btn mt-4 mb-3"
                  disabled={loading ? true : false}
                >
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfileNhanvien;
