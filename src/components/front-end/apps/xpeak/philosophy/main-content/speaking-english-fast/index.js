import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';

class ForgotToPronounce extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_speaking_english_fast')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Hay vội vàng nói hết câu</p>
          </div>
          <div className="box-content">
            <ul>
              <li>
                <p>
                  Chúng ta mới thực sự bắt đầu thay thế môn ngoại ngữ tiếng Nga
                  bằng tiếng Anh kể từ năm 1990 trở đi. 25 năm với 1 nền kinh tế
                  còn đang loay hoay phát triển, rõ ràng chúng ta vẫn đang mò
                  mẫm với môn tiếng Anh.
                </p>
                <h3 className="text-center">International</h3>
                <h3 className="text-center">/ˌɪntəˈnæʃnəl/</h3>
                <p>
                  Một từ mà gồm 5 âm như trên quá dài đối với người Việt và dễ
                  gây cho chúng ta sự nhầm lẫn & "loạn" khi phát âm. "Sợ" hơn độ
                  dài là chúng ta không biết phải phát âm nó như thế nào.
                </p>
              </li>
              <li>
                <p>
                  Hệ quả thứ 2 là việc này dẫn đến 1 từ trong tiếng Anh có trọng
                  âm. Cũng từ international đó, nhưng chúng ta không biết nhấn
                  vào đâu nếu chỉ nhìn vào mặt chữ.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
