import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";

import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <HeaderAdmin />
      <div className="">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
