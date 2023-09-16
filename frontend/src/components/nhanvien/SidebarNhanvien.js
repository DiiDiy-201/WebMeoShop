import React from "react";
import { Link } from "react-router-dom";

const SidebarNhanvien = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/nhanvien/dashboard">
              <i className="fa fa-tachometer"></i> Nhân viên
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
                <Link to="/nhanvien/categories">
                  <i className="fa fa-clipboard"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/nhanvien/category">
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
                <Link to="/nhanvien/products">
                  <i className="fa fa-clipboard"></i> Tất cả
                </Link>
              </li>

              <li>
                <Link to="/nhanvien/product">
                  <i className="fa fa-plus"></i> Thêm
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/nhanvien/orders">
              <i className="fa fa-shopping-basket"></i> Đơn hàng
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNhanvien;
