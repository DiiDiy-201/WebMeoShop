import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutAdmin } from "../../../../actions/adminActions";

import "../../../../App.css";

const HeaderAdmin = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.adminAuth);

  const logoutHandler = () => {
    dispatch(logoutAdmin());
    alert.success("Bạn đã đăng xuất!");
  };

  return (
    <Fragment>
      <header
        className="header-1"
        style={{ backgroundColor: "#e3e1e1", padding: "0" }}
      >
        <div className="container-fluid">
          <div
            className="row"
            style={{ justifyContent: "space-between !important" }}
          >
            <div className=" col-lg-5 col-md-5 col-sm-2 col-8 d-flex align-items-center">
              <nav className="main-nav d-none d-lg-block">
                <ul className="d-flex align-items-center">
                  <li className="menu-item">
                    <Link to="/admin/dashboard">
                      <img
                        style={{ height: "60px" }}
                        src="https://res.cloudinary.com/dioebre1q/image/upload/v1694021452/logo/logo_bpz2zv.gif"
                      />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-4 ">
              {/* <Link to="/" className="header-1-logo text-center  ">
                <img src="/images/header-1-logo.svg" alt="" />
              </Link> */}
            </div>
            <div className=" col-lg-5 col-md-5 col-sm-8 d-sm-block d-none d-flex justify-content-between align-items-center">
              <div className="header-right-area d-flex justify-content-end align-items-center">
                {/* header-1-icons */}
                <div className="header-1-contact ">
                  <ul className="d-flex flex-direction-row justify-content-between align-items-center">
                    {/* {isAuthenticated ? ( */}
                    <>
                      <li>
                        <nav className="main-nav d-none d-lg-block mt-2">
                          <ul className="d-flex align-items-center">
                            <li className="menu-item">
                              <div className="d-flex align-items-center">
                                <figure className="avatar avatar-nav">
                                  {admin.avatar ? (
                                    <img
                                      src={admin.avatar && admin.avatar.url}
                                      alt={admin && admin.name}
                                      className="rounded-circle"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </figure>
                                <Link
                                  to="#!"
                                  className="menu-link d-flex align-items-center mt-2"
                                >
                                  <h5>{admin.name}</h5>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-caret-down-fill ml-2"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                  </svg>
                                </Link>
                              </div>
                              <ul className="submenu-home1">
                                <li>
                                  <Link to="/admin/dashboard">
                                    Trang quản trị
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/admin/profile">Thông tin</Link>
                                </li>
                                <Link
                                  to="/admin/login"
                                  className="text-danger"
                                  onClick={logoutHandler}
                                >
                                  Đăng xuất
                                </Link>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </li>
                    </>
                    {/* ) : (
                      <li className="mt-4">
                        <Link to="/admin/login">
                          <button className="primary--btn login-btn mr-3">
                            Đăng nhập
                          </button>
                        </Link>
                      </li>
                    )} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* moi */}
    </Fragment>
  );
};

export default HeaderAdmin;
