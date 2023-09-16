import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, clearErrors } from "../../actions/userActions";
import { allNhanviens } from "../../actions/adminActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const NhanvienList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, nhanviens } = useSelector(
    (state) => state.allNhanviens
  );
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allNhanviens());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa nhân viên thành công");
      navigate("/admin/nhanviens");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setNhanviens = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Ngày tham gia",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Quyền",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    nhanviens.forEach((nhanvien) => {
      data.rows.push({
        id: nhanvien._id,
        name: nhanvien.name,
        email: nhanvien.email,
        createdAt: String(nhanvien.createdAt).substring(0, 10),
        role: nhanvien.role,

        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${nhanvien._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(nhanvien._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Tài khoản nhân viên"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">
              <i className="fa fa-users"></i>Tất cả nhân viên
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setNhanviens()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NhanvienList;
