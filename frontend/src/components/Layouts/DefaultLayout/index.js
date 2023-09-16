import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container container-fluid">
        <div className="">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
