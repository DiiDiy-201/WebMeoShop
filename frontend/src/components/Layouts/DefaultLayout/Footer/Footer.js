import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer-area footer-design-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
              <div className="footer-wrap">
                <div className="row justify-content-between gy-5">
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>Về MEOShop </h3>
                      </div>
                      <div className="footer-address">
                        <ul>
                          <li>
                            <i className="las la-phone-volume"></i>
                            <span>
                              <Link to="/">+84 234 777 534 </Link>
                              <br />
                              <Link to="/">+84 673 235 777 </Link>
                            </span>
                          </li>
                          <li>
                            <i className="lar la-envelope"></i>
                            <span>
                              <Link to="/">meoshop@gmail.com </Link>
                              <br />
                              <Link to="/">duy22901@gmail.com </Link>
                            </span>
                          </li>
                          <li>
                            <i className="las la-map-marker"></i>
                            <span>
                              3/2, Xuân Khánh
                              <br />
                              Ninh Kiều, Cần Thơ {" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="single-widget text-lg-center">
                      <div className="footer-logo">
                        <Link to="/">
                          <img src="" alt="" />
                        </Link>
                      </div>
                      <div className="form-design form-design-1"></div>
                      <div className="footer-social pt-50">
                        <ul>
                          <li>
                            <Link to="/">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-linkedin-in"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-pinterest-p"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="single-widget">
                      <div className="footer-title">
                        <h3>Hỗ trợ khách hàng </h3>
                      </div>
                      <div className="footer-link">
                        <ul>
                          <li>
                            <Link to="/">Chính sách đổi trả </Link>
                          </li>
                          <li>
                            <Link to="/Contact.js">Phương thức vận chuyển </Link>
                          </li>
                          <li>
                            <Link to="/">Gửi yêu cầu hỗ trợ </Link>
                          </li>
                          <li>
                            <Link to="/">Hướng dẫn đặt hàng </Link>
                          </li>
                          <li>
                            <Link to="/">Các câu hỏi thường gặp </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 copy-right-section align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-lg-start text-center">
              <div className="copy-right-area">
                <p className="copy-text text-center">
                  Copyright 2023 MEOShop Quà Tặng Online
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="footer-card-support text-lg-end text-center"></div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
