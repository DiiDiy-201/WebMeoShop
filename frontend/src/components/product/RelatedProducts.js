import React from "react";
import { useSelector } from "react-redux";

import Product from "./Product";

const RelatedProducts = ({ category }) => {
  const { products } = useSelector((state) => state.products);
  return (
    <>
      {category ? (
        <>
          <section className="related-product pb-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3 className="eg-title1 eg-title2 mb-50">
                    Sản phẩm tương tự
                  </h3>
                </div>
              </div>
              <div className="row">
                {products.map(function (product) {
                  if (product.category === category) {
                    return (
                      <>
                        <Product key={product._id} product={product} col={3} />
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RelatedProducts;
