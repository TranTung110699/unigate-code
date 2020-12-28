import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';
import './stylesheet.scss';

class Solotions extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_frequently_asked_questions')} />
        <div className="box-container">
          <div className="box-question-answer">
            <p className="question">
              <b>
                Q1: Các bạn có tham khảo phương pháp khác hoặc quyển sách nào
                khi sáng tạo ra Xpeak không?
              </b>
            </p>
            <p>
              <b>Answer:</b>
            </p>
            <p>
              Có chứ, đứng trên vai người khổng lồ là 1 phương pháp rất tốt.
              Xpeak đứng trên vai rất nhiều người khổng lồ: Với phần phiên âm
              (áp dụng cho Rule #1 & #2), X-Team nghiên cứu "nát" cả quyển sách
              kinh điển: "English Phonetics & Phonology" của Peter Roach. Với
              Rule #3 (Break it down), X-Team có ứng dụng phương pháp Pimsleurs,
              phương pháp rất nổi tiếng Với Rule #4 (Learn by topics), X-Team có
              ứng dụng cách học từ vựng của Rosetta Stone & Duolingo Với Rule #5
              "Language parent" là 1 khái niêm được rất nhiều phương pháp áp
              dụng, trong đó có cả Effortless English của AJ Hoge, có cả The
              Third Year của Chris Lonsdale... Rất nhiều phương pháp nhấn mạnh
              Rule này. Với Rule #6 (Self-pacing) là của riêng Xpeak. Áp dụng
              công nghệ thông tin vào lớp học trực tuyến sẽ tạo ra những điều
              kiện mới mà trước đây không có.
            </p>
          </div>
          <div className="box-question-answer">
            <p className="question">
              <b>Q2: Wow, mình không nghĩ là các bạn lại nghiên cứu sâu thế?</b>
            </p>
            <p>
              <b>Answer:</b>
            </p>
            <p>
              Bọn mình cũng vậy, khi bắt đầu đi tìm liều thuốc, bọn mình đều
              không rõ liều thuốc đó là gì, và các "bác sỹ" khác đang giải quyết
              vấn đề như thế nào. Nghe như là Xpeak là 1 luận án vậy! Gần như
              vậy, bởi vì làm gì cũng phải có phương pháp luận, có tham khảo,
              nghiên cứu và thực tiễn ứng dụng. Xpeak là 1 kết quả công phu của
              Bọn mình đang áp dụng khoa học vào ngôn ngữ đấy. Hề, cứ tạm coi
              vậy đi, nhỉ? ^^
            </p>
          </div>
          <div className="box-question-answer">
            <p className="question">
              <b>Q3: Hãy so sánh Xpeak và Effortless English?</b>
            </p>
            <p>
              <b>Answer:</b>
            </p>
            <p>
              OK, các bạn đã nghe đến Effortless English, Crazy English, The 3rd
              year... tất cả đều được sáng tạo bởi người nước ngoài. Những trải
              nghiệm đó thực sự không áp dụng được cho người Việt 1 cách triệt
              để. Hãy đọc thêm ở đây nếu bạn thực sự muốn so sánh giữa Xpeak và
              các phương pháp luận nổi tiếng khác.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Solotions;
