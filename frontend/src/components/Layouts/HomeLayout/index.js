import HeaderHome from "./HeaderHome/HeaderHome";
import FooterHome from "./FooterHome/FooterHome";

import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <HeaderHome />
      <div className="">{children}</div>
      <FooterHome />
    </div>
  );
};

export default HomeLayout;
