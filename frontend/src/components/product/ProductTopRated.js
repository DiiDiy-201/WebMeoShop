import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listTopProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductTopRated = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products } = productTopRated;

  // Slide product
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // Slide product

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h3 className="eg-title1 eg-title2 mb-50">Top sản phẩm đánh giá cao:</h3>

      <Carousel responsive={responsive} infinite={true} autoPlay={true}>
        {products &&
          products.map((product) => (
            <div className={`col-sm-12 col-md-6 col-lg-12 my-3`}>
              <div
                className="eg-product-carde-alpha shadow-lg "
                style={{ borderRadius: "20px" }}
              >
                <div className="eg-porduct-thumb">
                  <Link to={`/product/${product._id}`}>
                    {product.images ? (
                      <img
                        className="card-img-top mx-auto"
                        src={product?.images[0]?.url}
                        alt="Product Img"
                        style={{ borderRadius: "15px" }}
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
                <div className="eg-porduct-body mt-2">
                  <h5 className="eg-product-title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h5>
                  <div className="eg-product-card-price">
                    <ins>
                      <span className="price-amount">
                        <bdi>{product.price} vnđ</bdi>
                      </span>
                    </ins>
                  </div>

                  <div className="product-card-bottom">
                    <ul className="product-rating">
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${(product.ratings / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span id="no_of_reviews">
                          ({product.numOfReviews} Đánh giá)
                        </span>
                      </div>
                    </ul>
                    <div className="product-add-btn">
                      <Link to={`/product/${product._id}`}>
                        Xem chi tiết <i className="fa fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default ProductTopRated;
