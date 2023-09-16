import React from "react";

const Features = () => {
  return (
    <div className="feature-area feature-style-one mb-100 pt-76">
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/dioebre1q/image/upload/v1694025800/features/feature-i2_a22qln_gfxyzp.svg"
                  alt=""
                />
              </div>
              <div className="feature-content">
                <h5>SẢN PHẨM ĐA DẠNG</h5>
                <p>Hơn 1000 sản phẩm</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/dioebre1q/image/upload/v1694025504/features/feature-i1_kuhehk_yfrzny.svg"
                  alt=""
                />
              </div>
              <div className="feature-content">
                <h5>GIAO HÀNG TẬN NƠI</h5>
                <p>Áp dụng cho toàn tỉnh</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/dioebre1q/image/upload/v1694025840/features/feature-i4_aavhpz_efxhaj.svg"
                  alt=""
                />
              </div>
              <div className="feature-content">
                <h5>DỊCH VỤ HOÀN HẢO</h5>
                <p>Gói quà miễn phí.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/dioebre1q/image/upload/v1694025702/features/feature-i3_n1cql4_1_fid1tb.svg"
                  alt=""
                />
              </div>
              <div className="feature-content">
                <h5>ĐỔI TRẢ MIỄN PHÍ</h5>
                <p>Đổi trả trong vòng 7 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
