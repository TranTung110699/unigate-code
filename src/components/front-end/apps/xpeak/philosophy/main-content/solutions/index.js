import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import '../../main-content/stylesheet.scss';
import Anna from '../images/anna.png';
import Sandy from '../images/sandy.png';
import Steve from '../images/steve.png';
import Frazer from '../images/frazer.png';
import Malcolm from '../images/malcolm.png';

class Solotions extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={t1('philosophy_solutions')} />
        <div className="box-container">
          {/* box 1*/}
          <div className="box green icon-tick">
            <p>Đơn thuốc - cách dùng</p>
          </div>
          <div className="box-content">
            <div className="text-center">
              <h3>Các khóa học</h3>
            </div>
            <p className="book-mark">1 series khóa ngữ âm:</p>
            <ul>
              <li>
                <p>12 Vowels</p>
              </li>
              <li>
                <p>8 dipthongs</p>
              </li>
              <li>
                <p>14 vowels</p>
              </li>
              <li>
                <p>12 common advanced sounds</p>
              </li>
              <li>
                <p>
                  30 tongue twisters. If you can speak those sentences flluently
                  then you are a truly a xpeaker
                </p>
              </li>
              <li>
                <p>Master 400 vocabulary</p>
              </li>
              <li>
                <p>Total: 1 month</p>
              </li>
            </ul>
            <p className="book-mark">1 series khóa giao tiếp cơ bản:</p>
            <ul>
              <li>
                <p>Xpeak 1</p>
                <ul>
                  <li>
                    <p>100 vocabulary</p>
                  </li>
                  <li>
                    <p>200 vocabs, 50 phrases, sentences to xpeak</p>
                  </li>
                  <li>
                    <p>8 everyday situations - Speak fluently the dialogs</p>
                  </li>
                  <li>
                    <p>20 bai giang videos</p>
                  </li>
                  <li>
                    <p>24 grammar points</p>
                  </li>
                  <li>
                    <p>Total: 3 weeks, 30 min / day</p>
                  </li>
                  <li>
                    <p>100 exercises</p>
                  </li>
                  <li>
                    <p>Free 2 hours face-to-face with xpeak tutors</p>
                  </li>
                </ul>
              </li>
              <li>
                <p>Xpeak 2</p>
              </li>
              <li>
                <p>Xpeak 3</p>
              </li>
            </ul>
            <div className="text-center">
              <h3>Bạn cần</h3>
            </div>
            <p className="book-mark">
              Đăng ký tài khoản và mua khóa học trên xpeak.vn hoặc trên app
            </p>
            <p className="book-mark">
              Bạn học trên cả web lẫn mobile. Hãy download các apps sau về học
            </p>
          </div>
        </div>
        {/* end box 1*/}
        {/* box 2*/}
        <div className="box-container">
          <div className="box green icon-tick">
            <p>Đội ngũ "Bác Sĩ"</p>
          </div>
          <div className="box-content">
            <div className="doctor">
              <div className="row">
                <div className="col-md-4">
                  <div className="avatar  text-center">
                    <img src={Anna} alt="anna" />
                  </div>
                  <p>
                    Anna là sáng lập viên của X-Team, GĐ trung tâm ngoại ngữ
                    GET. Thành tích của Anna là 8.5 IELTS. Tự tin mạnh mẽ và nói
                    tiếng Anh giọng Mỹ siêu "cool", Anna luôn mong ước có thể
                    truyền cảm hứng nói tiếng Anh chuẩn tới học sinh trên cả
                    nước. Kênh X-Team là một trong những sản phẩm đầu tay ngay
                    lập tức đã mang lại thành công vang dội chỉ sau 1 tháng ra
                    mắt.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="avatar  text-center">
                    <img src={Sandy} alt="sandy" />
                  </div>
                  <p>
                    Sandy là sáng lập viên của X-Team. Là sinh viên ĐH Hà nội và
                    hiện đang dạy tại trường Vinschool. Với rất nhiều năm giảng
                    dạy trong trường học và các trung tâm Ngoại ngữ, nắm giữ
                    nhiều vị trí quan trong về học thuật trong các Trung tâm,
                    Sandy là 1 cô giáo tuyệt vời. Nội dung khóa giao tiếp Xpeak
                    là một trong những đứa con tinh thần của Sandy.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="avatar text-center">
                    <img src={Steve} alt="steve" />
                  </div>
                  <p>
                    Steve là đồng sáng lập viên của VietED. Xuất thân từ "dân"
                    chuyên Toán nhưng Steve có niềm đam mê vô tận với môn tiếng
                    Anh. Cá nhân anh cũng đạt 8.5 IELTS. Luôn luôn tìm kiếm ý
                    tưởng để áp dụng Công nghệ thông tin vào giảng dạy tiếng
                    Anh, Xpeak một trong những liều thuốc Steve hết sức tận tình
                    ủng hộ.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <p className="display-none">Vieted</p>
                </div>
                <div className="col-md-4">
                  <div className="avatar text-center">
                    <img src={Frazer} alt="frazer" />
                  </div>
                  <p>
                    Thầy Frazer đến từ Cambridge, Anh. Frazer hiện đang là giáo
                    viên tại Canadian English Center. Cùng chia sẻ với tình
                    trạng người Việt nói tiếng Anh kém, Frazer tham gia cùng
                    VietED để vào những vai hết sức vui nhộn cùng X-Team. Quá
                    trình quay video hội thoại rất vất vả cho thấy lòng yêu nghề
                    của Frazer.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="avatar text-center">
                    <img src={Malcolm} alt="malcolm" />
                  </div>
                  <p>
                    Thầy Malcolm đến từ Melbourne, Australia. Sống ở Việt nam đã
                    trên 5 năm, Malcolm là bạn của X-Team Sau khi nghe X-Team
                    trình bày phương pháp Xpeak, Malcolm đã ngày đêm cùng X-Team
                    sửa soạn nội dung cũng như tham gia quay những đoạn video
                    demo chuẩn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end box 2*/}
        {/* box 3*/}
        <div className="box-container">
          <div className="box red icon-x">
            <p>khuyến cáo tác dụng phụ</p>
          </div>
          <div className="box-content">
            <div className="text-center">
              <h3>Khuyến cáo sau liều thuốc này:</h3>
            </div>
            <ul>
              <li>
                <p>
                  Trình độ nghe của bạn sẽ tự động tăng lên bởi vì nghe & nói là
                  2 kỹ năng liên quan mật thiết link
                </p>
              </li>
              <li>
                <p>Bạn sẽ học cách phân biệt 2 giọng Anh Anh & Anh Mỹ</p>
              </li>
              <li>
                <p>
                  Những kiến thức dạy cho bạn là hết sức thực tế và ứng dụng
                  trong giao tiếp hàng ngày chứ không phải xa lạ
                </p>
              </li>
              <li>
                <p>
                  Bạn sẽ biết cách & tự tin phát âm bất cứ 1 từ mới nào trong
                  tương lai
                </p>
              </li>
              <li>
                <p>
                  Bạn sẽ yêu thích môn tiếng Anh. Tiếng Anh sẽ không còn là nỗi
                  sợ nữa.
                </p>
              </li>
              <li>
                <p>Bạn sẽ được sửa sai trực tiếp với các bác sỹ Xpeak.</p>
              </li>
              <li>
                <p>Bạn sẽ trở thành một "English Xpeaker"</p>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h1>bạn đã sẵn sàng chữa bệnh chưa?</h1>
          </div>
        </div>
        {/* end box 3*/}
      </div>
    );
  }
}

export default Solotions;
