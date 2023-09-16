import HeaderShipper from "./HeaderShipper/HeaderShipper";

import React from "react";

const ShipperLayout = ({ children }) => {
  return (
    <div>
      <HeaderShipper />
      <div className="">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ShipperLayout;
