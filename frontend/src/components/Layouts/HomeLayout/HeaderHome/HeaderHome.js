import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../../actions/userActions";

import { uid } from "uid";

import "../../../../App.css";

const HeaderHome = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  //moi
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  //moi

  //loading: dem tu trong ngoac ra
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  //favourite
  const { favouriteItems } = useSelector((state) => state.favourite);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Bạn đã đăng xuất!");
  };

  //moi
  const generateKey = () => {
    return uid(16);
  };
  //moi

  return (
    <Fragment>
      {/* moi */}
      <header
        className="header-1 mb-10"
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
                    {/* <Link to="/" className="menu-link">
                      Shop quà online
                    </Link> */}
                    <Link to="/">
                      <img
                        style={{ height: "60px" }}
                        src="https://res.cloudinary.com/dioebre1q/image/upload/v1694021452/logo/logo_bpz2zv.gif"
                      />
                    </Link>
                  </li>
                  {/* {!location.pathname.includes("admin") ? ( */}
                  <>
                    <li>
                      <ul className="d-flex">
                        <li>
                          <nav className="main-nav d-none d-lg-block">
                            <ul className="d-flex align-items-center">
                              <li className="menu-item">
                                <Link to="" className="menu-link ">
                                  Danh mục
                                </Link>
                                <ul className="submenu-home1">
                                  {category?.map((category) => (
                                    <li key={generateKey()}>
                                      <Link to={`/search/${category.name}`}>
                                        {category.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <Link to="/contact" className="menu-link">
                        Liên hệ
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="/about" className="menu-link">
                        Giới thiệu
                      </Link>
                    </li>
                  </>
                  {/* ) : (
                     ""
                   )} */}
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
                <div className="header-1-icons">
                  <ul className="d-flex flex-direction-row justify-content-between align-items-center">
                    {isAuthenticated ? (
                      <>
                        <li>
                          <nav className="main-nav d-none d-lg-block mt-2">
                            <ul className="d-flex align-items-center">
                              <li className="menu-item">
                                <div className="d-flex align-items-center">
                                  <figure className="avatar avatar-nav">
                                    {user.avatar ? (
                                      <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
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
                                    <h5>{user.name}</h5>

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
                                  {user && user.role !== "admin" ? (
                                    <li>
                                      <Link to="/orders/me">Đơn hàng</Link>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  {user.role === "admin" ? (
                                    <li>
                                      <Link to="/admin/dashboard">
                                        Trang quản trị
                                      </Link>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  <li>
                                    <Link to="/me">Thông tin</Link>
                                  </li>
                                  <Link
                                    to="/"
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
                    ) : (
                      <li className="mt-4">
                        <Link to="/login">
                          <button className="primary--btn login-btn mr-3">
                            Đăng nhập
                          </button>
                        </Link>
                      </li>
                    )}

                    {!location.pathname.includes("admin") ? (
                      <li>
                        <Link to="/cart" style={{ textDacoration: "none" }}>
                          <div className="cart-btn position-relative mt-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              fill="currentColor"
                              className="bi bi-minecart mb-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7H1.102z" />
                            </svg>
                            <div className="cart-items-count">
                              {cartItems.length}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}

                    {!location.pathname.includes("admin") ? (
                      <li>
                        <Link
                          to="/favourites"
                          style={{ textDacoration: "none" }}
                        >
                          <div className="cart-btn position-relative mt-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="21"
                              fill="currentColor"
                              className="bi bi-suit-heart mb-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                            </svg>
                            <div className="cart-items-count">
                              {favouriteItems.length}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>

                {/* <div className="mt-2">
                <a href="http://13.212.48.35:3001/" target="_blank">
                  <button className="btn btn-warning rounded">TCS MEDIA</button>
                  </a>
                </div> */}

                <div className="header-1-contact d-flex align-items-center">
                  <div className="contact-num">
                    <span>Hotline </span>
                    <p>+84 234 777 534 </p>
                  </div>
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

export default HeaderHome;
