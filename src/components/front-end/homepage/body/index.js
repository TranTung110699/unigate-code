import React from 'react';
import Iphone6s from './images/iphone6s.png';
import SmartObject from './images/smart-object.png';
import XpeakAppStore from './xpeak-appstore';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="xpeak-body">
        <div className="xpeak-special">
          <div className="xpeak-special-background">
            <div className="container">
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 xpeak-special-left">
                <img src={Iphone6s} alt="iphone 6s" />
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 xpeak-special-right">
                <h1>Xpeak có gì mà hay thế?</h1>
                <ul>
                  <li className="first-li">
                    <h3>44 ngữ âm và 24 tình huống giao tiếp</h3>
                    <p>
                      Xpeak lấy ngữ âm làm trọng tâm. Giúp người học phát âm
                      chuẩn bản ngữ ngay từ đầu. Đây chính là nền tảng để bạn
                      nói tiếng anh tốt nhất.
                    </p>
                  </li>
                  <li className="second-li">
                    <h3>môi trường thực hành hàng ngày</h3>
                    <p>
                      Nói mọi lúc, mọi nơi. Xpeak sử dụng hệ thông nhận diện
                      giọng nói thông minh để bạn biết mình nói sai ở đâu, nói
                      sai âm nào để luyện tập cho chính xác.
                    </p>
                  </li>
                  <li className="third-li">
                    <h3>phát âm chuẩn ngay từ đầu</h3>
                    <p>
                      Bạn muốn nói đúng, bạn phải nói chậm lại, học cách phát âm
                      cho chuẩn. Hãy bắt đầu nói đúng từng âm, sau đó là từng
                      từ. Cuối cùng, chúng tôi tin chắc bạn sẽ giao tiếp chuẩn
                      cả đoạn hội thoại.
                    </p>
                  </li>
                  <li className="fourth-li">
                    <h3>Tracking and notification</h3>
                    <p>
                      Quá trình học, hệ thống sẽ lưu lại toàn bộ kết quả. Từ đó,
                      hệ thống sẽ sử dụng công cụ phân tích thông minh để thông
                      báo cho bạn biết bạn học chỗ nào chưa tốt để việc học được
                      tập trung hơn
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-12 xpeak-learn-more">
                <button href="/">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="xpeak-devices">
          <div className="xpeak-devices-background">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1>Học mọi lúc mọi nơi trên mọi thiết bị</h1>
                  <h3>
                    Sẽ tuyệt vời hơn nếu bạn sử dụng Xpeak trên điện thoại thông
                    minh hoặc máy tính bảng.
                  </h3>
                  <XpeakAppStore />
                  <div className="smart-object">
                    <img src={SmartObject} alt="smart-object" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
