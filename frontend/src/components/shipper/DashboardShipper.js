import React, { Fragment } from "react";

import MetaData from "../layout/MetaData";
import SidebarShipper from "./SidebarShipper";

const DashboardShipper = () => {
  return (
    <Fragment>
      <MetaData title={"Shipper trang chủ"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SidebarShipper />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">
            <img
              className="shipper-img"
              src="/images/admin/delivery-truck.svg"
            ></img>
            Shipper
          </h1>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardShipper;
