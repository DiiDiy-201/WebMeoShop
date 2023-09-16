import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import SidebarNhanvien from "./SidebarNhanvien";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getNhanvienProducts,
  nhanviendeleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const NvProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getNhanvienProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa sản phẩm thành công");
      navigate("/nhanvien/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const setProducts = () => {
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
          label: "Giá",
          field: "price",
          sort: "asc",
        },
        {
          label: "Kho",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `${product.price} vnđ`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/nhanvien/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(nhanviendeleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"Nhân viên tất cả sản phẩm"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">
              <i class="fa fa-product-hunt"></i>Tất cả sản phẩm
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
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

export default NvProductsList;
