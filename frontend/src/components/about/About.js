import React, { Fragment } from "react";

import MetaData from "../layout/MetaData";

const About = () => {
  return (
    <Fragment>
      <MetaData title={"Về chúng tôi"} />

      <div class="row justify-content-center">
        <div class="col-12 mt-5">
          <h1 id="products_heading">Giới thiệu</h1>
          <hr />
          <h2>Giới thiệu về MEOShop quà tặng online</h2>
          <p>
            Shop quà online là cửa hàng quà tặng, chuyên cung cấp sỉ, lẻ các mẫu
            quà tặng, đồ lưu niệm cho nhiều đối tượng khác nhau. Từ trẻ em, học
            sinh sinh viên cho tới người trung tuổi, từ khách hàng cá nhân cho
            đến những khách hàng doanh nghiệp mua quà tặng dành cho khách hàng.
          </p>
          <img
            class="my-5 img-fluid d-block mx-auto"
            src="/images/about1.jpg"
            alt="About1"
          />
          <p>
            Thông qua Website: <a href="/">https://meoshopquatangoline.com/</a> – chúng
            tôi cũng cung cấp cho những quý khách hàng ở xa, không có điều kiện
            ghé thăm Shop, một phương thức mua hàng tiện lợi và nhanh chóng.
            Thông tin các sản phẩm bao gồm hình ảnh, Video hay mô tả chi tiết
            đều được cập nhật lên Website. Chỉ với vài thao tác đặt hàng đơn
            giản, dù bạn ở bất cứ đâu, chúng tôi cũng sẽ chuyển hàng đến cho bạn
            trong thời gian sớm nhất. Đến với Shop quà trực tuyến, bạn sẽ được
            trải nghiệm phương thức mua hàng tiện lợi và đặc biệt rất an toàn
            với chính sách đổi trả và chỉ phải thanh toán khi đã nhận hàng và
            kiểm tra.
          </p>
          <br />
          <p>
            Chúng tôi luôn luôn cập nhật những sản phẩm mới, những mẫu quà tặng
            mới, thường xuyên cập nhật xu hướng quà tặng để có thể cung cấp đến
            quý khách hàng những món quà tặng độc đáo, ý nghĩa. Ngoài ra, chúng
            tôi còn không ngừng hoàn thiện và nâng cao chất lượng dịch vụ của
            mình để có thể làm hài lòng tối đa cho quý khách hàng.
          </p>
          <img
            class="my-5 img-fluid d-block mx-auto"
            src="/images/about2.jpg"
            alt="About2"
          />
          <h3>Sứ mệnh của Shop quà trực tuyến</h3>
          <p>
            Tạo ra một dịch vụ quà tặng chuyên nghiệp, từ đó góp phần giúp mọi
            người yêu thương, xích lại gần nhau hơn, làm thăng hoa các mối quan
            hệ trong xã hội của bạn.
          </p>
          <h3>Tầm nhìn và mục tiêu của Shop quà trực tuyến</h3>
          <p>
            Chúng tôi hướng tới việc trở thành một chuỗi cửa hàng chuyên cung
            cấp quà tặng dành cho nhiều đối tượng khác nhau, hệ thống chi nhánh
            trải dài ở khắp các tỉnh thành để đáp ứng tốt nhất nhu cầu của quý
            khách hàng.
          </p>
          <br />
          <p>
            Cung cấp cho khách hàng dịch vụ quà tặng chuyên nghiệp từ sản phẩm
            cho tới khâu đóng gói và giao hàng, bất chấp khoảng cách không gian
            và thời gian.Không ngừng đổi mới, tự hoàn thiện bản thân để hướng
            tới mục tiêu thỏa mãn nhu cầu của khách hàng.
          </p>
          <h3>Giá trị cốt lõi của Shop quà trực tuyến</h3>
          <ol type="1" start="1">
            <li>
              <b>Sự hài lòng của khách hàng là tối thượng.</b>
            </li>
            <li>
              <b>
                Thường xuyên đổi mới và không ngừng tự hoàn thiên chất lượng sản
                phẩm và dịch vụ.
              </b>
            </li>
            <li>
              <b>Lấy chữ tín làm đầu.</b>
            </li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
