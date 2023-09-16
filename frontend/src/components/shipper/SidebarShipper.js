import React from "react";
import { Link } from "react-router-dom";

const SidebarShipper = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/shipper/dashboard">
              <i className="fa fa-truck"></i> Shipper
            </Link>
          </li>

          <li>
            <Link to="/shipper/orders/processed">
              <i className="fa fa-clock"></i> Đơn chưa giao
            </Link>
          </li>

          <li>
            <Link to="/shipper/orders/shipping">
              <i className="fa fa-arrow-circle-o-right"></i> Đơn đang giao
            </Link>
          </li>

          <li>
            <Link to="/shipper/orders/shipped">
              <i className="fa fa-check-square-o"></i> Đơn đã giao
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarShipper;
