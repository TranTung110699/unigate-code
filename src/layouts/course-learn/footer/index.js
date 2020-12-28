import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import { t3 } from 'translate';
import DefaultFooter from 'layouts/ums-theme/footer/default-footer';
import { getThemeConfig } from 'utils/selectors';
import BackgroundEVN from './images/rectangle.png';
import getConfig from './configs';
import './stylesheet.scss';

const styles = {
  footer: {
    width: '100%',
    height: '168px',
    padding: '28px 40% 21px 35%',
    backgroundColor: '#242c42',
  },
  divStyle: { position: 'relative', float: 'left', marginRight: '10px' },
  rectangle: { position: 'relative' },
  footer_logo: {
    maxWidth: '80%',
    maxHeight: '80%',
    width: 'auto',
    height: 'auto',
  },
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDefaultFooter() {
    return <DefaultFooter />;
  }

  renderEvnFooter() {
    const { copyright, contactUs, domainSchool, themeConfig } = this.props;
    const socialLinks = lGet(domainSchool, 'social_links', []);
    const footerSocialLinks = getConfig(socialLinks);

    return (
      <div className="evn-footer p-t-20">
        <div className="container">
          <div className="row">
            <div className="evn-footer__group col-lg-3 col-lg-offset-3 col-md-4 col-md-offset-2 col-sm-5 col-sm-offset-1 col-xs-12">
              <div className="evn-footer__contacts horizontal-middle-div">
                <div className="evn-footer__contact-title horizontal-middle-div">
                  <p>{contactUs}</p>
                </div>
                <div className="evn-footer__contact-details">
                  <div className="logo-wrapper">
                    <a
                      className="evn-footer__contact-detail"
                      style={styles.divStyle}
                      href="/"
                    >
                      <img
                        id="image1"
                        style={styles.rectangle}
                        src={BackgroundEVN}
                        alt="EVN-logo"
                      />
                      <img
                        id="image2"
                        src={themeConfig.footer_logo}
                        alt="EVN-logo"
                        style={styles.footer_logo}
                      />
                    </a>
                  </div>
                  <div className="social-link-wrapper">
                    {footerSocialLinks &&
                      footerSocialLinks.map((socialLink, i) => (
                        <div key={`social-${i}`}>
                          <a
                            className="evn-footer__contact-detail"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.divStyle}
                            href={socialLink.link}
                          >
                            <img
                              id="image1"
                              style={socialLink.iconStyle}
                              src={socialLink.background}
                              alt={socialLink.alt}
                            />
                            <img
                              id="image2"
                              src={socialLink.icon}
                              alt={socialLink.alt}
                            />
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="evn-footer__group col-lg-3 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-5 col-sm-offset-1 col-xs-12">
              <div className="evn-footer__links horizontal-middle-div">
                <div className="evn-footer__link-title horizontal-middle-div">
                  <p>{t3('links')}</p>
                </div>
                <div className="evn-footer__link-details">
                  <div className="evn-footer__link-detail">
                    <a
                      href="https://evn.com.vn/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Tập đoàn
                    </a>
                    {/*

                <Link to={getCatalogueUrl('home')}>
                  <p>{t1('course_catalogue')}</p>
                </Link>
                    */}
                  </div>
                </div>
              </div>
            </div>
            <div className="evn-footer__group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12">
              <div className="evn-footer__copyright">{copyright}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { themeConfig } = this.props;
    const layout = lGet(themeConfig, 'layout', '');
    if (layout === 'evn') {
      return this.renderEvnFooter();
    }
    return this.renderDefaultFooter();
  }
}

Footer.propTypes = {
  style: PropTypes.shape({}),
  contactUs: PropTypes.string,
  links: PropTypes.arrayOf,
  copyright: PropTypes.string,
};

Footer.defaultProps = {
  style: {},
  contactUs: 'LIÊN HỆ',
  links: ['Categories'],
  copyright: 'Sản phẩm được cung cấp bởi VietED',
};

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
  domainSchool: lGet(state, 'domainInfo.school', {}),
});

export default connect(mapStateToProp)(Footer);
