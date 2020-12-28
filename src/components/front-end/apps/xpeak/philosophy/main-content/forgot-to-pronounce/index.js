import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import FiveAudio from './audio/five.mp3';
import FireAudio from './audio/fire.mp3';
import FightAudio from './audio/fight.mp3';
import FileAudio from './audio/file.mp3';
import '../../main-content/stylesheet.scss';
import ReactAudioPlayer from 'react-audio-player';

class ForgotToPronounce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div ref="componentPanel">
        <Helmet title={t1('philosophy_forgot_to_pronounce')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Nguyên nhân 2: quên phát âm phụ âm cuối</p>
          </div>
          <div className="box-content">
            <p>
              Hãy xem 4 từ sau: <b>Five, Fire, Fight, file</b>
            </p>
            <div className="box-audio">
              <div className="row">
                <div className="col-md-3">
                  <ReactAudioPlayer src={FiveAudio} controls />

                  <p>Five</p>
                </div>
                <div className="col-md-3">
                  <ReactAudioPlayer src={FireAudio} controls />
                  <p>Fire</p>
                </div>
                <div className="col-md-3">
                  <ReactAudioPlayer src={FightAudio} controls />
                  <p>Fight</p>
                </div>
                <div className="col-md-3">
                  <ReactAudioPlayer src={FileAudio} controls />
                  <p>File</p>
                </div>
              </div>
            </div>
            <p className="book-mark">
              Do đặc thù ngôn ngữ tiếng Việt là đơn âm và chúng ta không phát âm
              cuối, đối với một số bạn thì 4 từ này phát âm giống hệt nhau và
              đều là "phai" /faɪ/
            </p>
            <p>
              Như vậy 4 âm cuối /v/, /ə(r)/, /l/ /l/ hoàn toàn không được phát
              âm.
            </p>
            <div className="text-center consequence">
              <h3>Hệ quả</h3>
              <p>Chúng ta thường nói sai do thiếu âm.</p>
              <p>&</p>
              <p>
                Không có thói quen nối âm khi nói và do đó cũng nghe được những
                câu nối âm nhanh.
              </p>
            </div>
            <p className="book-mark">
              Lỗi này nghe có vẻ là nhỏ và chúng ta thường xem nhẹ nó. Nhưng hãy
              cùng xem câu ví dụ vô nghĩa sau:
            </p>
            <div className="text-center">
              <b>Five is actually a factor of ten </b>
              <p>/faɪv ɪz ˈækʧʊəli ə ˈfæktər ɒv tɛn/</p>
            </div>
            <p className="book-mark">
              Ở tốc độ nói bình thường của người bản xứ, khi nghe, tai chúng ta
              sẽ nghe thấy âm sau:
            </p>
            <div className="text-center">
              <p>/vɪz/</p>
            </div>
            <p className="book-mark">
              Với tư duy tự nhiên của người Việt, đã là phụ âm V thì hoặc nó
              đứng đầu 1 từ, hoặc nó ở giữa, chứ không thể ở cuối cho nên khi
              nghe âm não bộ sẽ bắt đầu tìm kiếm trong bộ nhớ từ nào có âm vɪz
              trong đó. Visualize? Visible? ... Uhm..không giống lắm.
            </p>
            <p className="book-mark">
              Khi não bộ chưa kịp tìm kiếm xong âm vɪz, thì chúng ta lại nghe
              thấy âm zæk. Vậy là chúng ta hoàn toàn chịu.
            </p>
            <p className="book-mark">
              Hiện tượng trên còn có tên gọi là hiện tượng nối âm và nó rất xa
              lạ với tiếng Việt. Nó đơn giản như ảnh hưởng rất lớn tới khả năng
              nghe hiểu. Và nếu không nắm được cách xử lý, bạn cũng không bao
              giờ nói chuẩn được.
            </p>
          </div>
        </div>
        <div className="box-container">
          <div className="box green icon-tick">
            <p>Quy tắc 2: đánh vần ngữ âm</p>
          </div>
          <div className="box-content">
            <p className="book-mark">
              Để phân biệt giữa các từ five, fire, fight, file cách an toàn nhất
              khi chúng ta còn "non" là mở từ điển ra và tra phiên âm.
            </p>
            <p className="book-mark">
              Những âm khó như âm /l/ khi đứng ở cuối thì phát âm như thế nào?
              Bạn yên tâm, tất cả những vấn đề này đã được giải quyết trong bài
              về âm /l/ trong series khóa ngữ âm.{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
