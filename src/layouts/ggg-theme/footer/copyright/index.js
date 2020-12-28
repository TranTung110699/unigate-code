import React from 'react';
import CopyRightImage from './images/copyright.png';
import './stylesheet.scss';

class CopyRight extends React.Component {
  render() {
    return (
      <div className="copyright">
        <div className="container">
          <div className="col-md-6 text-left">
            <p>Công ty Cổ phần Thương mại Dịch vụ Cổng Vàng</p>
            <p>
              Trụ sở chính: Tầng 6, tòa nhà Toyota, 315 Trường Chinh, Thanh
              Xuân, Hà Nội
            </p>
            <p>GPĐK: Số 0103023679 cấp ngày 09/04/2008</p>
            <p>
              ĐT: 043 222 3000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:
              support.hn@ggg.com.vn
            </p>
          </div>
          <div className="col-md-6 text-right">
            <img src={CopyRightImage} alt="" />
            <p>© 2011 Golden Gate ., JSC. All rights reserved</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CopyRight;
