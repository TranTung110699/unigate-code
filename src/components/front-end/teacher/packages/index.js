import React from 'react';
import { connect } from 'react-redux';

import Silver from './images/silver.png';
import Gold from './images/gold.png';
import Vip from './images/vip.png';
import XpeakSilver from './images/xpeak_silver.png';
import XpeakGold from './images/xpeak_gold.png';
import XpeakVip from './images/xpeak_vip.png';

import './stylesheet.scss';

class Package extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePackage: 'silver',
    };
  }

  onShowSilverPopup = () => {
    this.setState({
      activePackage: 'silver',
    });
  };

  onShowGoldPopup = () => {
    this.setState({
      activePackage: 'gold',
    });
  };

  onShowVipPopup = () => {
    this.setState({
      activePackage: 'vip',
    });
  };

  getActivePackageBoxClass = (packageCode) => {
    if (packageCode && packageCode === this.state.activePackage) {
      return 'active';
    }

    return '';
  };

  render() {
    const activePackage = this.state.activePackage || 'silver';
    return (
      <div className="container xpeak-package-wrapper">
        <h3 className="uppercase text-center">
          Bạn chưa tham gia Xpeak Live?
          <br />
          Hãy tham gia để được học với những giáo viên tốt nhất của chúng tôi
        </h3>
        <div className="row">
          <div className="col-md-4 col-xs-12 col-sm-4">
            <div
              onClick={this.onShowSilverPopup}
              className={`box-skill silver ${this.getActivePackageBoxClass(
                'silver',
              )}`}
            >
              <img src={Silver} alt="" />
              <p>giao tiếp cơ bản</p>
            </div>
          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">
            <div
              onClick={this.onShowGoldPopup}
              className={`box-skill gold ${this.getActivePackageBoxClass(
                'gold',
              )}`}
            >
              <img src={Gold} alt="" />
              <p>giao tiếp tốt</p>
            </div>
          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">
            <div
              onClick={this.onShowVipPopup}
              className={`box-skill vip ${this.getActivePackageBoxClass(
                'vip',
              )}`}
            >
              <img src={Vip} alt="" />
              <p>giao tiếp tự tin</p>
            </div>
          </div>
        </div>
        <div className="clearfix" />

        {activePackage && activePackage === 'silver' && (
          <div className="xpeak-silver-wrapper">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <img src={XpeakSilver} alt="" />
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <h3 className="package-title">
                  xpeak silver - <span>Giao tiếp cơ bản</span>
                </h3>
                <div className="underline" />
                <ul className="policy">
                  <li> Học online trên app theo giáo trình Xpeak</li>
                  <li>
                    {' '}
                    Tuân thủ chương trình học mà Xpeak đã thiết kế cho người học
                  </li>
                  <li> Dành 45-60 phút học/luyện tập hàng ngày với Xpeak</li>
                  <li> Thời gian học online: 365 ngày</li>
                  <li>
                    {' '}
                    Kết nối với trực tuyến 12 buổi với giáo viên (mỗi buổi 30
                    phút) để được sửa âm, luyện nói và tập giao tiếp
                  </li>
                  <li>
                    {' '}
                    Khung giờ trực tiếp với giao viên linh hoạt theo yêu cầu của
                    học viên
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 outcome text-center">
                <h3>Bạn sẽ được</h3>
                <div className="underline" />
                <p>
                  Cải thiện khả năng nghe-nói tiếng Anh một cách rõ rệt, giao
                  tiếp <span className="light-note">cơ bản</span> sau 03 tháng
                </p>
                <div className="col-md-12 text-center register-package-btn">
                  <a href="#register-xpeak-live" className="uppercase">
                    Đăng ký
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {activePackage && activePackage === 'gold' && (
          <div className="xpeak-gold-wrapper">
            <div className="row">
              <div className="col-md-5">
                <img src={XpeakGold} alt="" />
              </div>
              <div className="col-md-7">
                <h3 className="package-title">
                  xpeak gold - <span>Giao tiếp cơ bản</span>
                </h3>
                <div className="underline" />
                <ul className="policy">
                  <li>Học online trên app theo giáo trình Xpeak</li>
                  <li>
                    Tuân thủ chương trình học mà Xpeak đã thiết kế cho người học
                  </li>
                  <li>Dành 45-60 phút học/luyện tập hàng ngày với Xpeak</li>
                  <li>Thời gian học online: 365 ngày</li>
                  <li>
                    Kết nối với trực tuyến 22 buổi với giáo viên (mỗi buổi 30
                    phút) để được sửa âm, luyện nói và tập giao tiếp
                  </li>
                  <li>
                    Khung giờ trực tiếp với giáo viên linh hoạt theo yêu cầu của
                    học viên
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 outcome text-center">
                <h3>Bạn sẽ được</h3>
                <div className="underline" />
                <p>
                  Cải thiện khả năng nghe-nói tiếng Anh một cách rõ rệt, giao
                  tiếp <span className="light-note">tốt</span> sau 03 tháng
                </p>
                <div className="col-md-12 text-center register-package-btn">
                  <a href="#register-xpeak-live" className="uppercase">
                    Đăng ký
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {activePackage && activePackage === 'vip' && (
          <div className="xpeak-vip-wrapper">
            <div className="row">
              <div className="col-md-5">
                <img src={XpeakVip} alt="" />
              </div>
              <div className="col-md-7">
                <h3 className="package-title">
                  xpeak vip - <span>Giao tiếp cơ bản</span>
                </h3>
                <div className="underline" />
                <ul className="policy">
                  <li>Học online trên app theo giáo trình Xpeak</li>
                  <li>
                    Tuân thủ chương trình học mà Xpeak đã thiết kế cho người học
                  </li>
                  <li>Dành 45-60 phút học/luyện tập hàng ngày với Xpeak</li>
                  <li>Thời gian học online: 365 ngày</li>
                  <li>
                    Kết nối với trực tuyến 22 buổi với giáo viên (mỗi buổi 30-45
                    phút) để được sửa âm, luyện nói và tập giao tiếp
                  </li>
                  <li>
                    Học trực tiếp 12 buổi với 1 đến 3 giáo viên (mỗi buổi 60
                    phút) để luyện giao tiếp theo các tình huống thuông dụng
                  </li>
                  <li>Khung giờ học linh hoạt theo yêu cầu của học viên.</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 outcome text-center">
                <h3>Bạn sẽ được</h3>
                <div className="underline" />
                <p>
                  Cải thiện khả năng nghe-nói tiếng Anh một cách rõ rệt, giao
                  tiếp <span className="light-note">tự tin</span> sau 03 tháng
                </p>
                <div className="col-md-12 text-center register-package-btn">
                  <a href="#register-xpeak-live" className="uppercase">
                    Đăng ký
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="clearfix" />
      </div>
    );
  }
}

export default connect()(Package);
