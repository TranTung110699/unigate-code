import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';

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
        <div className="footer-wrapper" id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 bottom-widget" id="connect-us">
                <p className="title">Kết nối với chúng tôi</p>
                <ul className="list-inline">
                  <li className="facebook-icon">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://facebook.com/americanpolytechnic"
                    >
                      <i className="fa fa-facebook fa-2x" />
                    </a>
                  </li>
                  <li className="youtube-icon">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/channel/UCr3_A5aa1HISbTVzTo07rwQ"
                    >
                      <i className="fa fa-youtube-play fa-2x" />
                    </a>
                  </li>
                  <li className="twitter-icon">
                    <a href="">
                      <i className="fa fa-twitter fa-2x" />
                    </a>
                  </li>
                </ul>
                <a href="#">
                  <img
                    id="logo"
                    className="img-responsive"
                    alt=""
                    src="http://www.caodangvietmy.edu.vn/wp-content/themes/apc-2017/images/img-logo-01.png?resolution=1920,1"
                    data-adaptive-images="true"
                  />
                </a>
              </div>
              <div className="col-md-3 col-sm-6 bottom-widget" id="address">
                <p className="title">Cơ sở đào tạo:</p>
                <p>
                  <i className="fa fa-map-marker" />
                  Cơ sở Trung Sơn:
                  <br /> Số 5-7-9-11 đường số 4, khu dân cư Trung Sơn, TP.HCM{' '}
                </p>
                <p>
                  <i className="fa fa-map-marker" />
                  Cơ sở Gò Vấp:
                  <br /> Số 1A Nguyễn Văn Lượng, phường 6, quận Gò Vấp, TP.HCM
                </p>
                <p>
                  <i className="fa fa-map-marker" />
                  Cơ sở Cần Thơ
                  <br />
                  Số 135P, đường Trần Hưng Đạo, P. An Phú, Q. Ninh Kiều, TP Cần
                  Thơ
                </p>
              </div>
              <div className="col-md-3 col-sm-6 bottom-widget">
                <p className="title">Liên hệ:</p>
                <p>
                  <i className="fa fa-phone" />
                  Cơ sở Trung Sơn:
                  <br />
                  ĐT: (028) 5433 6888
                  <br />
                  Hotline: 0938 90 5050 | 0902 8585 50
                </p>
                <p>
                  <i className="fa fa-phone" />
                  Cơ sở Gò Vấp:
                  <br />
                  ĐT: (028) 7302 5888
                  <br />
                  <br />
                </p>
                <p>
                  <i className="fa fa-phone" />
                  Cơ sở Cần Thơ:
                  <br />
                  ĐT: (0292)3.832.045 <br />
                  Hotline: 0937 91 0212{' '}
                </p>
                <p>
                  <i className="fa fa-envelope" />
                  Email:
                  <br />
                  info@caodangvietmy.edu.vn
                </p>
              </div>
              <div className="col-md-3 col-sm-6 bottom-widget">
                <p className="title">Sơ đồ đến trường</p>
                <p>
                  <iframe
                    style={this.iframeStyle}
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3919.9411005657175!2d106.69068000000001!3d10.739022999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eec7745a3db%3A0xd67efac4e9d528c5!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIE5naOG7gSBWaeG7h3QgTeG7uQ!5e0!3m2!1svi!2s!4v1397126327032"
                    width="700"
                    height="450"
                    frameBorder="0"
                  />
                </p>
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
