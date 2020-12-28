import React from 'react';
import { t3 } from 'translate';
import IPImage from './resources/IP.png';
import './stylesheet.scss';

class Xpeak extends React.Component {
  cssClass = 'vieted-home-page-products-xpeak';

  render() {
    const { title, subtitle, intro } = this.props;
    const src =
      typeof this.props.src === 'undefined'
        ? 'http://xpeak.vn'
        : this.props.src;

    return (
      <div className={this.cssClass}>
        <div className="row">
          <div className={`col-sm-7 col-sm-push-5 ${this.cssClass}__group`}>
            <div className={`${this.cssClass}__title`}>{title || 'XPEAK'}</div>
            <div className={`${this.cssClass}__subtitle`}>
              {subtitle || 'Học tiếng Anh giao tiếp'}
            </div>
            <div className={`${this.cssClass}__detail`}>
              <p>{intro || 'Teach Smart, Learn Easy'}</p>
            </div>
            <div className={`${this.cssClass}__buttons`}>
              {src && (
                <a
                  href={src || 'http://xpeak.vn'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${this.cssClass}__button`}
                >
                  {t3('try_it_for_free')}
                </a>
              )}
            </div>
          </div>
          <div className={`col-sm-5 col-sm-pull-7 ${this.cssClass}__group`}>
            <div className={`${this.cssClass}__image`}>
              <img src={IPImage} alt="image" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Xpeak.propTypes = {};

Xpeak.defaultProps = {};

export default Xpeak;
