import React from 'react';
import './stylesheet.scss';

class Intro extends React.Component {
  render() {
    return (
      <div>
        <div className="bg-secondary xpeak-live-intro">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>Xpeak Live</h3>
              </div>
            </div>
            <div className="row mb32 mb-xs-24">
              <div className="col-md-12 col-sm-12 text-center">
                <p>
                  Mang đến cho bạn một phương pháp học hoàn toàn mới, <br />
                  thông qua môi trường Internet bạn có thể tương tác với giáo
                  viên và các bạn cùng lớp như trong một lớp học truyền thống.
                </p>
              </div>
              <div className="col-md-12 text-center trial-to-learn-btn">
                <a href="#xpeak-class" className="uppercase">
                  Học thử ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
