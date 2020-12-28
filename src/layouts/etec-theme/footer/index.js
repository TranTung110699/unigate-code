import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
// import fbIcon from './images/ic-fb.png';
// import googleIcon from './images/ic-googleplus.png';
// import ytbIcon from './images/ic-ytb.png';
import phoneIcon from './images/ic-phone.png';
import mailIcon from './images/ic-mail.png';
import addressIcon from './images/ic-address.png';

import './stylesheet.scss';

class Footer extends React.Component {
  aStyle = { color: 'white' };

  render() {
    const { themeConfig } = this.props;
    return (
      <div className="footer-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-7 text-left">
              <div className="logo">
                <img src={themeConfig.footer_logo} alt="" />
              </div>
              <div className="company-name">
                Công ty Cổ phần Công nghệ giáo dục Thông Minh
              </div>
              <div className="item">
                <img src={addressIcon} alt="" />
                Tầng 6 - Toà nhà HH3, Sudico Sông Đà - Mễ Trì - Từ Liêm - Hà Nội
              </div>
              <div className="item">
                <img src={phoneIcon} alt="" />
                024 2244 6868
              </div>
              <div className="item">
                <img src={mailIcon} alt="" />
                <a style={this.aStyle} href="mailto:support@vieted.com">
                  support@vieted.com
                </a>
              </div>
            </div>
            <div className="col-sm-3  text-left">
              <div className="title">Product</div>
              <div className="item">
                <Link style={this.aStyle} to={getFrontendUrl('tests')}>
                  Luyện thi
                </Link>
              </div>
              <div className="item">
                <Link style={this.aStyle} to={getFrontendUrl('blog')}>
                  Daily Tips
                </Link>
              </div>
              <div className="item">
                <Link style={this.aStyle} to={getFrontendUrl('pay')}>
                  Pricing
                </Link>
              </div>
            </div>
            <div className="col-sm-2 text-left">
              <div className="title">Legal</div>
              <div className="item">Policy</div>
              <div className="item">Terms of Use</div>
            </div>
            {/* <div className="col-md-2  col-sm-2  text-left"> */}
            {/* <div className="title">Contact</div> */}
            {/* <div className="item">Contact us</div> */}
            {/* <div className="social-icons"> */}
            {/* <img src={fbIcon} alt="" /> */}
            {/* <img src={googleIcon} alt="" /> */}
            {/* <img src={ytbIcon} alt="" /> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProp)(Footer);
