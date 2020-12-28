import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';

class ForgotToPronounce extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_environments')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Thiếu môi trường giao tiếp</p>
          </div>
          <div className="box-content">
            <p>
              Phần lớn chúng ta chỉ học ở giờ trên lớp và khi về nhà, chúng ta
              phải học một mình với quyển sách hoặc học trên mạng. Chúng ta
              không có 1 người thầy giỏi để nói chuyện cùng. Điều này dẫn đến
              việc kiến thức không được luyện tập. Những mẫu câu, từ vựng chúng
              ta học không được thực hành hoặc nói ra
            </p>
          </div>
        </div>
        <div className="box-container">
          <div className="box red icon-x">
            <p>Vấn đề của hệ thống giáo dục phổ thông & đại học</p>
          </div>
          <div className="box-content">
            <p>
              Trên đây là những "virus" mang mầm bệnh. Những virus mầm bệnh này
              khi gặp môi trường giáo dục của nước ta lại càng phát huy mạnh mẽ
              khiến căn bệnh trở nên trầm trọng hơn, trên một qui mô rộng rãi
              hơn.
            </p>
            <ul>
              <li>
                <p>
                  Chúng ta mới thực sự bắt đầu thay thế môn ngoại ngữ tiếng Nga
                  bằng tiếng Anh kể từ năm 1990 trở đi. 25 năm với 1 nền kinh tế
                  còn đang loay hoay phát triển, rõ ràng chúng ta vẫn đang mò
                  mẫm với môn tiếng Anh.
                </p>
              </li>
              <li>
                <p>
                  Phần lớn chương trình học phổ thông của chúng ta lại quá
                  chuyên tâm vào Ngữ pháp.
                </p>
              </li>
              <li>
                <p>
                  Bản thân các Giáo viên tiếng Anh cũng không giao tiếp được
                  tiếng Anh . Theo khảo sát mới nhất (năm 2013) của đề án 2020
                  (đề án nâng cao trình độ giáo viên tiếng Anh), tại TPHCM chỉ
                  có 15.5% giáo viên đạt chuẩn. Hà nội tương tự và các thành phố
                  khác còn tồi tệ hơn.{' '}
                </p>
              </li>
            </ul>
            <p>
              Như vậy rõ ràng chúng ta đang uống nhầm thuốc, tập thể dục sai
              cách.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
