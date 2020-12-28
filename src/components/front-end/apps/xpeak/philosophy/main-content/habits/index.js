import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import SpeakAudio from './audio/speak.mp3';
import BreakAudio from './audio/break.mp3';
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
        <Helmet title={t1('philosophy_habits')} />
        <div className="box-container">
          <div className="box red icon-x">
            <p>Tiếng Anh nhìn 1 đằng, đọc 1 nẻo</p>
          </div>
          <div className="box-content">
            <p>Bạn hãy nghe thử 2 từ sau</p>
            <div className="box-audio">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-center">Speak</p>
                  <ReactAudioPlayer src={SpeakAudio} controls />
                </div>
                <div className="col-md-6">
                  <p className="text-center">Break</p>
                  <ReactAudioPlayer src={BreakAudio} controls />
                </div>
              </div>
              <p>
                Cả 2 từ đều chứa tổ hợp "eak" nhưng khi nói lại tạo ra những âm
                khác nhau, 1 âm giống âm "i" trong tiếng Việt và 1 âm đại loại
                giống âm "ây"
              </p>
              <p>
                Đây chỉ là 1 ví dụ đơn giản nhất cho việc để nói đúng 1 từ trong
                tiếng Anh không hề đơn giản. Tìm hiểu thêm các ví dụ khác tại{' '}
                <a href="http://vieted.com/english-spellings"> đây.</a>
              </p>
            </div>
          </div>
          <div className="text-center consequence">
            <h3>Hệ quả</h3>
            <p>Chúng ta không biết phải phát âm 1 từ như thế nào cho đúng.</p>
            <p>&</p>
            <p>Chúng ta rất dễ nhầm lẫn khi nghe.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotToPronounce;
