import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu1"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Danh mục
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu1">
              <li>
                <Link to="/admin/categories">
                  <i className="fa fa-clipboard"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/admin/category">
                  <i className="fa fa-plus"></i> Thêm
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Sản phẩm
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Thêm
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Đơn hàng
            </Link>
          </li>

          {/* <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Tài khoản
            </Link>
          </li> */}

          <li>
            <a
              href="#taikhoanSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-users"></i> Tài khoản
            </a>
            <ul className="collapse list-unstyled" id="taikhoanSubmenu">
              <li>
                <Link to="/admin/users">
                  <i className="fa fa-users"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/admin/khachs">
                  <i className="fa fa-user"></i> Khách hàng
                </Link>
              </li>

              <li>
                <a
                  href="#nhanvienSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  <i className="fa fa-user"></i> Nhân viên
                </a>
                <ul className="collapse list-unstyled" id="nhanvienSubmenu">
                  <li>
                    <Link to="/admin/nhanviens">
                      <i className="fa fa-clipboard"></i> Tất cả
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/nhanvien">
                      <i className="fa fa-plus"></i> Thêm
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* <li>
            <a
              href="#nhanvienSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-user"></i> Nhân viên
            </a>
            <ul className="collapse list-unstyled" id="nhanvienSubmenu">
              <li>
                <Link to="/admin/nhanviens">
                  <i className="fa fa-clipboard"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/admin/nhanvien">
                  <i className="fa fa-plus"></i> Thêm
                </Link>
              </li>
            </ul>
          </li> */}

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Đánh giá
            </Link>
          </li>

          <li>
            <Link to="/admin/analytics">
              <i className="fa fa-tachometer"></i> Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
