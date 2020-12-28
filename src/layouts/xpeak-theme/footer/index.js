import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';

import './stylesheet.scss';
import Facebook from '../common/icons/facebook.svg';
import TrustpilotLogo from './Trustpilot_logo_on_black.png';
import TrustpilotStar from './trustpilot-stars.png';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class index extends React.Component {
  imgStyle = { width: '150px' };
  imgStyle1 = { width: '100px', opacity: '0.5' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userInfo } = this.props;

    return (
      <div className="ui-common-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="title">
                Công ty Cổ phần Công nghệ giáo dục Thông Minh (VietED)
              </h4>
              <hr />
              <div className="clearfix ui-company-reference">
                <div className="pull-right">
                  <a href="https://www.facebook.com/xpeaktienganhgiaotiep/">
                    <img src={Facebook} />
                  </a>
                </div>
                <div className="pull-left">
                  <div>
                    Tầng 6, Tòa nhà HH3 - Sudico Sông Đà, Mỹ Đình, Nam Từ Liêm,
                    Hà Nội, Việt Nam.
                  </div>
                  <div>Email: support@vieted.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">
              <div className="clearfix">
                <div className="pull-left footer-outline">
                  <h6>Giới thiệu</h6>
                  <ul>
                    <li>
                      <Link to="/">Giới thiệu về Xpeak</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">
              <div className="clearfix">
                <div className="pull-left footer-outline">
                  <h6>Tin tức</h6>
                  <ul>
                    <li>
                      <a href="/blog" target="_blank">
                        Danh mục tin tức
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">
              <div className="pull-left footer-outline">
                <h6>Khóa học</h6>
                <ul>
                  <li>
                    <Link to="/learn/course-list/55229">Ngữ Âm</Link>
                  </li>
                  <li>
                    <Link to="/learn/course-list/55230">Giao tiếp</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">
              {userInfo && userInfo.iid && (
                <div className="pull-left footer-outline">
                  <h6>Thanh toán</h6>
                  <ul>
                    <li>
                      <Link to="/pay">Nạp tiền</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 footer-outline">
              <h6>{t1('our_customers_love_us')}!</h6>
              <ul>
                <li>
                  <a
                    href="https://www.trustpilot.com/review/xpeak.vn"
                    target="_blank"
                  >
                    <img src={TrustpilotLogo} style={this.imgStyle} />
                  </a>{' '}
                </li>
                <li>
                  <a
                    href="https://www.trustpilot.com/review/xpeak.vn"
                    target="_blank"
                  >
                    <img src={TrustpilotStar} style={this.imgStyle1} />
                  </a>{' '}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  userInfo: state.user.info,
});

export default connect(mapStateToProp)(index);
