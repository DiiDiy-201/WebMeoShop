import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart } from "../../actions/favouriteAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Favourite = () => {
  const dispatch = useDispatch();

  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <Fragment>
      <MetaData title={"Yêu thích"} />

      {favouriteItems.length === 0 ? (
        <Fragment>
          <h2 className="mt-5 text-center">Yêu thích chưa có sản phẩm</h2>
          <div className="text-center">
            <Link to="/" className="eg-btn md--btn primary--btn">
              Trở về
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            <span className="fa fa-heart"> </span>
            Yêu thích: <b>{favouriteItems.length} sản phẩm</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div
              style={{ borderRight: "1px solid #eaeaea" }}
              className="col-12 col-lg-12"
            >
              <hr />
              <div className="row item-in-cart">
                <div className="col-4 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Hình ảnh</p>
                  </b>
                </div>

                <div className="col-5 col-lg-3">
                  <b>
                    <p className="cart-title-table ">Tên sản phẩm</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table">Giá</p>
                  </b>
                </div>

                <div className="col-5 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Kho</p>
                  </b>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <b>
                    <p className="cart-title-table ">Hành động</p>
                  </b>
                </div>
              </div>

              {favouriteItems.map((item) => (
                <Fragment>
                  <hr />

                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          style={{ borderRadius: "10px" }}
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link
                          id="product_name_favourite"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price_favourite">{item.price} vnđ</p>
                      </div>
                      <div className="col-5 col-lg-2 ">
                        <p>
                          <span
                            id="stock_status"
                            className={
                              item.stock > 0 ? "greenColor" : "redColor"
                            }
                          >
                            {item.stock > 0 ? item.stock : "Hết hàng"}
                          </span>
                        </p>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0 text-center">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => deleteFavouriteItems(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>

                  {/* <hr /> */}
                </Fragment>
              ))}
            </div>
            <div className="col-12 col-lg-3 my-4"></div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Favourite;
