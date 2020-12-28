import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import SettingLanguage from 'layouts/language';
import Icon from 'components/common/Icon';
import mapImage from './images/map.png';

import './cdvmstylesheet.scss';
import './stylesheet.scss';

class Footer extends React.Component {
  imgStyle = { maxWidth: '100%', height: 'auto' };
  iframeStyle = {
    fontSize: '14px',
    lineHeight: '1.5em',
    border: '0px',
    width: '100%',
    height: 'auto',
  };

  render() {
    const { themeConfig } = this.props;

    return (
      <div className="ums-footer-wrapper">
        <div className="footer-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 bottom-widget">
                <div className="footer-info-wrapper">
                  <img
                    src={themeConfig.footer_logo}
                    alt=""
                    className="footer-logo"
                  />
                  <div className="about-desc">
                    <br />
                    <p>
                      <Icon icon="address" /> Phường Yên Nghĩa - Quận Hà Đông -
                      Hà Nội.
                    </p>
                    <p>
                      <Icon icon="email" /> info@wu.edu.vn
                    </p>
                    <p>
                      <Icon icon="public" /> www.wu.edu.vn
                    </p>
                  </div>
                  <ul className="socials-wrapper">
                    <li>
                      <a
                        className="facebook"
                        href="https://www.facebook.com/wu.edu.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon="facebook" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="twitter"
                        href="https://twitter.com/Westeruni_hn?lang=vi"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon="twitter" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="youtube"
                        href="https://www.youtube.com/channel/UCeMmkMqu9jlMYo-0YjJbqzg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon="youtube" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/daihocthanhtay/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon="instagram" />
                      </a>
                    </li>
                  </ul>
                  <SettingLanguage />
                </div>
              </div>
              <div className="col-md-4 col-sm-6 bottom-widget">
                <div className="fast-links-wrapper">
                  <h3 className="footer-title">Liên kết nhanh</h3>
                  <div className="fast-links-menu-wrapper">
                    <ul className="fast-links-menu">
                      <li className="fast-link-item">
                        <a href="http://wu.edu.vn/chuong-trinh-dao-tao/">
                          Chương trình đào tạo
                        </a>
                      </li>
                      <li className="fast-link-item">
                        <a href="http://wu.edu.vn/dang-ky-truc-tuyen/">
                          Đăng ký trực tuyến
                        </a>
                      </li>
                      <li className="fast-link-item">
                        <a href="http://lms.wu.edu.vn">Hệ thống học tập WU</a>
                      </li>
                      <li className="fast-link-item">
                        <a href="http://open.wu.edu.vn">
                          Hệ thống học tập mở WU
                        </a>
                      </li>
                      <li className="fast-link-item">
                        <a href="http://edtech.wu.edu.vn">
                          Blog công nghệ giáo dục WU
                        </a>
                      </li>
                      <li className="fast-link-item">
                        <a href="http://isr.wu.edu.vn">Trung tâm ISR</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 bottom-widget">
                <div className="school-address-map-wrapper">
                  <h3 className="footer-title">Sơ đồ đến trường</h3>
                  <a
                    href="https://www.google.com/maps/dir//Trường+Đại+học+Thành+Tây,+Đường+Tố+Hữu,+Yên+Nghĩa,+Hà+Đông,+Hà+Nội,+Việt+Nam/@20.959676,105.7453493,17z/data=!4m15!1m6!3m5!1s0x313452efff394ce3:0x391a39d4325be464!2zVHLGsMahzIBuZyDEkGHMo2kgaG_Mo2MgVGhhzIBuaCBUw6J5!8m2!3d20.959676!4d105.747538!4m7!1m0!1m5!1m1!1s0x313452efff394ce3:0x391a39d4325be464!2m2!1d105.747538!2d20.959676"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      width="571"
                      height="357"
                      src={mapImage}
                      alt=""
                      style={this.imgStyle}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                © Bản quyền thuộc về{' '}
                <a href="http://wu.edu.vn">
                  Đại học Thành Tây - Đại học Thời Đại mới
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(Footer);
