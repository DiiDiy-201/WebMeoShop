import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - MeoShop quà tặng online`}</title>
    </Helmet>
  );
};

export default MetaData;
