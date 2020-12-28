import React from 'react';
import './stylesheet.scss';
import './mobile.scss';

class Slogan extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="slogan">
            <h3>Xpeak - Phương pháp học tiếng Anh giao tiếp mới</h3>
            <p>
              *Hay: Cùng <a href="/"> X-Team </a> đi tìm liều thuốc chữa căn
              bệnh trầm kha của người Việt: "
              <strong>Khả năng giao tiếp tiếng Anh kém</strong>"
            </p>
            <div className="alert alert-danger">
              Khuyến cáo: Hãy dành 3-5 phút để đọc bài viết chán ngắt này,{' '}
              <b>CÓ THỂ</b> nó sẽ thay đổi <b> HOÀN TOÀN </b>
              cách bạn học tiếng Anh.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slogan;
