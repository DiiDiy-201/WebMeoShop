import HeaderNhanvien from "./HeaderNhanvien/HeaderNhanvien";

import React from "react";

const NhanvienLayouts = ({ children }) => {
  return (
    <div>
      <HeaderNhanvien />
      <div className="">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default NhanvienLayouts;
