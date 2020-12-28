import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';

class ForgotToPronounce extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_symptoms')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Triệu chứng căn bệnh</p>
          </div>
          <div className="text-center text-transform">
            <h3>
              Có thể bạn mắc bệnh mà bạn không biết. Hãy cùng xét nghiệm nhanh!{' '}
            </h3>
          </div>
          <div className="box-content">
            <ul>
              <li>
                <p>
                  Bạn đã học tiếng Anh khá lâu, 1 năm, 2 năm thậm chí 10 năm.
                </p>
              </li>
              <li>
                <p>
                  Bạn có thể chưa thường xuyên dùng tiếng Anh, hoặc bạn vẫn dùng
                  tiếng Anh trong công việc hàng ngày của bạn: viết thư, đọc tài
                  liệu chuyên môn, thậm chí đọc báo bằng tiếng Anh.
                </p>
              </li>
              <li>
                <p>
                  <b>Nhưng</b> bạn vẫn không giao tiếp được với "Tây"
                </p>
                <ul>
                  <li>
                    <p>Hoặc bạn không hiểu Tây nói gì</p>
                  </li>
                  <li>
                    <p>Hoặc bạn không tìm được từ vựng để nói</p>
                  </li>
                  <li>
                    <p>
                      Hoặc bi kịch hơn cả, bạn có từ vựng và bạn nghe hiểu được,
                      nhưng khi bạn nói ra, "Tây" không hiểu gì
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <p>
            Nào nếu đây đúng là bạn thì có lẽ bạn đã mắc bệnh. Hãy gặp gỡ bác sỹ
            X-Team. Và hãy tiếp tục đọc...
          </p>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
