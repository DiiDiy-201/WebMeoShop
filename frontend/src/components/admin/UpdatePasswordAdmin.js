import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAdmin, clearErrors } from "../../actions/adminActions";
import { UPDATE_PASSWORD_ADMIN_RESET } from "../../constants/adminConstants";

import { useNavigate } from "react-router-dom";

const UpdatePasswordAdmin = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật mật khẩu thành công");

      navigate("/admin/profile");

      dispatch({
        type: UPDATE_PASSWORD_ADMIN_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePasswordAdmin(formData));
  };

  return (
    <Fragment>
      <MetaData title="Cập nhật mật khẩu" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Cập nhật mật khẩu</h1>
                <div className="form-group">
                  <label htmlFor="old_password_field">Mật khẩu cũ</label>
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new_password_field">Mật khẩu mới</label>
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-block eg-btn md--btn primary--btn mt-4 mb-3"
                  disabled={loading ? true : false}
                >
                  Cập nhật mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePasswordAdmin;
