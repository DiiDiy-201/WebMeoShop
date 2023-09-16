import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createNhanvien } from "../../actions/adminActions";
// import { useHistory } from "react-router-dom";
import { CREATE_NHANVIEN_RESET } from "../../constants/adminConstants";

const CreateNhanvien = () => {
  const [nhanvien, setNhanvien] = useState({
    name: "",
    emails: "",
    password: "",
    role: "",
  });

  const { name, email, password, role } = nhanvien;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.nhanvien);

  //   const history = useHistory();

  useEffect(() => {
    if (success) {
      navigate("/admin/users");
      alert.success("Tạo tài khoản thành công");
      dispatch({ type: CREATE_NHANVIEN_RESET });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("role", role);
    formData.set("avatar", avatar);

    dispatch(createNhanvien(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNhanvien({ ...nhanvien, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Tạo tài khoản nhân viên"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="text-center mb-3">Tạo tài khoản</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Tên</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Mật khẩu</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Quyền</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={onChange}
                  >
                    <option>Chọn quyền</option>
                    <option value="admin">admin</option>
                    <option value="nhanvien">nhanvien</option>
                    <option value="shipper">shipper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Ảnh đại diện</label>
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
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Chọn ảnh đại diện
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNhanvien;
