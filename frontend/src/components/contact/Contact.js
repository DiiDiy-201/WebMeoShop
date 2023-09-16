import React, { Fragment } from "react";

import MetaData from "../layout/MetaData";

import Banner from "../layout/Banner";

const Contact = () => {
  return (
    <Fragment>
      <MetaData title={"Liên hệ"} />

      <Banner
        src="https://res.cloudinary.com/dioebre1q/image/upload/v1692799462/banner/banner_t4nkwf.png"
        search="false"
        text="Liên hệ chúng tôi"
        text2="MEOShop xin hân hạnh được phục vụ bạn!"
      />
      <section class="contact-section pt-100 pb-100">
        <div class="container">
          <div class="row justify-content-center mb-40">
            <div class="col-md-6 text-center">
              <h5 class="title-25 text-uppercase">
                Liên Hệ! <br />
                Sẽ liên hệ lại với bạn sớm nhất
              </h5>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="contact-form-area">
                <div class="form-wrap box--shadow">
                  <h4 class="title-25 contact-form-title mb-8">Liên hệ</h4>
                  <p>
                    Địa chỉ email của bạn sẽ được bảo mật. Các trường bắt buộc
                    được đánh dấu *
                  </p>
                  <form
                    class="contact-form-title"
                    action="https://formsubmit.co/duyp22901@gmail.com"
                    method="post"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-inner">
                          <label>Tên của bạn</label>
                          <input
                            type="text"
                            name="fname"
                            placeholder="Tên của bạn"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-inner">
                          <label>Email</label>
                          <input
                            type="text"
                            name="fname"
                            placeholder="Email của bạn"
                          />
                        </div>
                      </div>
                      <div class="col-12 mb-40">
                        <div class="form-inner">
                          <textarea
                            name="message"
                            placeholder="Ghi chú"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-12 pb-3">
                        <a href="#" class="primary--btn contact-btn">
                          <button
                            type="submit"
                            style={{
                              border: "none",
                              background: "none",
                              color: "white",
                            }}
                          >
                            Gửi
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Contact;
