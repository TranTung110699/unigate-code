import React from 'react';
import { t3 } from 'translate';
import equestLogo from './resources/equest.png';
import gggLogo from './resources/ggg.png';
import iaeLogo from './resources/iae.png';
import minhComLogo from './resources/minhcom.png';
import evnLogo from './resources/evn.png';
import tiladoLogo from './resources/tilado.png';
import ntqLogo from './resources/ntq.png';
import vietinbankLogo from './resources/vietinbank.png';
import './stylesheet.scss';

class Customers extends React.Component {
  cssClass = 'vieted-home-page-customers';

  render() {
    const title = t3('customers');

    const logos = [
      equestLogo,
      gggLogo,
      iaeLogo,
      minhComLogo,
      evnLogo,
      tiladoLogo,
      ntqLogo,
      vietinbankLogo,
    ];

    return (
      <div className={this.cssClass}>
        <div className="container">
          <div className={`${this.cssClass}__title`}>{title}</div>
          <div className={`${this.cssClass}__logos`}>
            {logos &&
              logos.map((logo) => (
                <div className={`${this.cssClass}__logo`}>
                  <img src={logo} alt="logo" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Customers.propTypes = {};

Customers.defaultProps = {};

export default Customers;
