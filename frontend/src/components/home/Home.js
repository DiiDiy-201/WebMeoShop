import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "../layout/MetaData";
import Product from "../product/Product";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../../actions/productActions";
import { useParams } from "react-router-dom";

import { getCategory } from "../../actions/categoryActions";

//moi
import Banner from "../layout/Banner";
import { useLocation } from "react-router-dom";
import CategorySection from "../layout/CategorySection";
import Features from "../layout/Features";
//moi

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const params = useParams();

  const location = useLocation();

  //code moi them
  const { category } = useSelector((state) => state.category);
  //code moi them

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getCategory());

    dispatch(getProducts(keyword, currentPage, price, catagory, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, catagory, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  //moi
  let ishome = false;
  if (location.pathname === "/") {
    ishome = true;
  }
  //moi

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Sản phẩm mới nhất"} />

          {/* moi */}
          {ishome && (
            <Banner
              src="https://res.cloudinary.com/dioebre1q/image/upload/v1692806849/banner/banner_lienhe_zllxao.jpg"
              search="true"
              text="MEOShop quà tặng online"
              text2="Luôn luôn lắng nghe, luôn luôn thấu hiểu"
            />
          )}

          {ishome && <CategorySection />}

          {ishome ? (
            <div className="col-lg-12 mt-5">
              <div className="section-head-style-one">
                <h2>Các sản phẩm ở MEOShop </h2>
              </div>
            </div>
          ) : (
            <>
              {
                <Banner
                  src="https://res.cloudinary.com/dioebre1q/image/upload/v1692806849/banner/banner_lienhe_zllxao.jpg"
                  search="true"
                  text2="Tìm kiếm"
                />
              }
              <div className="col-lg-12 mt-5">
                <div className="section-head-style-one">
                  <h2>Danh sánh sản phẩm</h2>
                </div>
              </div>
            </>
          )}
          {/* moi */}

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div
                      className="eg-product-carde-alpha-filter-sanpham shadow-lg "
                      style={{ borderRadius: "20px" }}
                    >
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `1k`,
                            1000: `1000k`,
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `${value}k`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />

                        {/* <hr className="my-5" /> */}

                        <div className="mt-5">
                          <h4 className="eg-title1 hr_home_search mb-3">
                            Danh mục
                          </h4>

                          <ul className="pl-0">
                            {category.map((category) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={category._id}
                                onClick={() => setCatagory(category.name)}
                              >
                                {category.name}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* <hr className=" my-3" /> */}

                        <div className="mt-5">
                          <h4 className="eg-title1 hr_home_search mb-3">
                            Đánh giá
                          </h4>

                          <ul className="list-group pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                className="list-group-item"
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                itemClass={"page-item"}
                linkClass={"page-link"}
                activeLinkClass="bg-f96822"
              />
            </div>
          )}

          <Features />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
