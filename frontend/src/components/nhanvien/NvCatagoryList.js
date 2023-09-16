import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import SidebarNhanvien from "./SidebarNhanvien";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  nhanviendltCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const NvCatagoryList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, category } = useSelector((state) => state.category);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.dltCategory
  );

  useEffect(() => {
    dispatch(getCategory());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa danh mục thành công");
      navigate("/nhanvien/categories");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const setCategorys = () => {
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
          label: "Action",
          field: "actions",
        },
      ],
      rows: [],
    };

    category.forEach((category) => {
      data.rows.push({
        id: category._id,
        name: category.name,
        actions: (
          <Fragment>
            <Link
              to={`/nhanvien/category/${category._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCategoryHandler(category._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteCategoryHandler = (id) => {
    dispatch(nhanviendltCategory(id));
  };

  return (
    <Fragment>
      <MetaData title={"Nhân viên tất cả danh mục"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">
              <i class="fa fa-product-hunt"></i>Tất cả danh mục
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategorys()}
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

export default NvCatagoryList;
