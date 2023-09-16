import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import SidebarNhanvien from "./SidebarNhanvien";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  nhanviennewCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";

const NvNewCategory = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, success } = useSelector((state) => state.newCategory);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/nhanvien/categories");
      alert.success("Thêm danh mục thành công");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, error, success, navigate, alert]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(nhanviennewCategory(formData));
  };
  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Nhân viên thêm danh mục mới"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarNhanvien />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Thêm danh mục mới</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Tên</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Hình ảnh</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Chọn hình ảnh
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn-block eg-btn md--btn primary--btn py-3"
                  disabled={loading ? true : false}
                >
                  Thêm
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NvNewCategory;
