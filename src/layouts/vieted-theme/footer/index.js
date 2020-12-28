import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t3 } from 'translate';
import { Link } from 'react-router-dom';
import { getThemeConfig } from 'utils/selectors';

import './stylesheet.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      copyright,
      address,
      mail,
      phone,
      representativeName,
      representativeEmail,
      representativePhone,
      themeConfig,
    } = this.props;

    return (
      <div className="vieted-footer">
        <div className="container">
          <div className="row">
            <div className="vieted-footer__group col-md-4">
              <div className="vieted-footer__contact">
                <div className="vieted-footer__contact-title">
                  {t3('head_office')}
                </div>
                <div className="vieted-footer__contact-details">
                  <div className="vieted-footer__contact-detail">
                    <i className="fa fa-phone" aria-hidden="true" />
                    <span>{phone}</span>
                  </div>
                  <div className="vieted-footer__contact-detail">
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>{mail}</span>
                  </div>
                  <div className="vieted-footer__contact-detail">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>{address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="vieted-footer__group col-md-4">
              <div className="vieted-footer__contact">
                <div className="vieted-footer__contact-title">
                  {t3('representative')}
                </div>
                <div className="vieted-footer__contact-detail">
                  <i className="fa fa-user" aria-hidden="true" />
                  <span>{representativeName}</span>
                </div>
                <div className="vieted-footer__contact-detail">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>{representativeEmail}</span>
                </div>
                <div className="vieted-footer__contact-detail">
                  <i className="fa fa-phone" aria-hidden="true" />
                  <span>{representativePhone}</span>
                </div>
              </div>
            </div>
            <div className="vieted-footer__group col-md-4">
              <div className="vieted-footer__logo">
                <img
                  src={themeConfig.footer_logo}
                  alt={themeConfig.site_name}
                />
                <p>{copyright}</p>
              </div>
              <div className="vieted-footer__social">
                <Link to="#">
                  <i className="fa fa-facebook" aria-hidden="true" />
                </Link>
                <Link to="#">
                  <i className="fa fa-skype" aria-hidden="true" />
                </Link>
                <Link to="#">
                  <i className="fa fa-linkedin-square" aria-hidden="true" />
                </Link>
                <Link to="#">
                  <i className="fa fa-google-plus" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  address: PropTypes.string,
  copyright: PropTypes.string,
  mail: PropTypes.string,
  phone: PropTypes.string,
};

Footer.defaultProps = {
  address:
    'Tầng 6, Tòa nhà HH3 - Sudico Sông Đà, Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam',
  copyright: 'Copyright 2017 VietED. All rights reserved',
  mail: 'support@vieted.com',
  phone: '(+84) 4 2244 6868',
  representativeName: 'Phạm Thái Bình - CEO',
  representativeEmail: 'binhpt@vieted.com',
  representativePhone: '(+84) 966 388 333',
};

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(Footer);
