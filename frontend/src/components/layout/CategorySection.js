import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "uid";

const CategorySection = () => {
  const { category } = useSelector((state) => state.category);
  const generateKey = () => {
    return uid(16);
  };

  return (
    <div className="category-area-start category-style-one mt-100 position-relative">
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-head-style-one">
              <h2>Bạn cần tìm gì ?</h2>
              <p>Đây là danh mục của MEOShop </p>
            </div>
          </div>
        </div>
        <div className="row">
          {category?.map((category, idx) => {
            return (
              <div
                className="col-lg-2 col-md-3 col-sm-6 category-box-alpha shadow-sm"
                style={{ borderRadius: "20px" }}
                key={generateKey()}
              >
                <div className="category-icon">
                  <Link to={`/search/${category?.name}`}>
                    <img
                      style={{ borderRadius: "25px" }}
                      src={category?.images[0]?.url}
                    />
                  </Link>
                </div>
                <h5 className="category-title">
                  <Link to={`/search/${category.name}`}>{category.name}</Link>
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
