import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';
import './stylesheet.scss';

class ForgotToPronounce extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_practices')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Từ vựng học nhưng không áp dụng được</p>
          </div>
          <div className="box-content">
            <ul>
              <li>
                <p>
                  Từ vựng học lẻ tẻ, không theo bối cảnh (context) dẫn đến việc
                  "rơi vãi" rất nhiều. Từ vựng phần lớn rơi vào dạng "passive",
                  tức là có thể bạn đọc hiểu, nhưng không bao giờ phát ra được.
                </p>
              </li>
              <li>
                <p>Chỉ học nghĩa, không chịu học nghe & phát âm.</p>
              </li>
            </ul>
            <div className="practices_example">
              <p>
                <b>- Việt: Execuse me, what did you say?</b>
              </p>
              <p>
                <b>- Tây: I said "colleague"</b>
              </p>
              <p>
                <b>- Việt: Oh colleague, I know that word.</b>
              </p>
            </div>
            <p>
              Trong trường hợp này, rõ ràng bạn đã biết và hiểu từ colleague,
              nhưng bạn chưa nghe nó bao giờ.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
