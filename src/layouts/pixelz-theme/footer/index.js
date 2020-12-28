import React from 'react';
import './stylesheet.scss';
import Facebook from '../common/icons/facebook.svg';
import GooglePlus from '../common/icons/google-plus.svg';
import Linkedin from '../common/icons/linkedin.svg';
import Pinterest from '../common/icons/pinterest.svg';
import Twitter from '../common/icons/twitter.svg';
import TrustpilotLogo from './Trustpilot_logo_on_black.png';
import TrustpilotStar from './trustpilot-stars.png';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class index extends React.Component {
  divStyle = { width: '50%' };
  imgStyle = { width: '150px' };
  imgStyle1 = { width: '100px', opacity: '0.5' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui-common-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="title">PIXELZ ACADEMY</h4>
              <hr />
              <div className="clearfix ui-company-reference">
                <div className="pull-right">
                  <a href="https://www.facebook.com/pixelz.inc">
                    <img src={Facebook} />
                  </a>
                  <a href="https://twitter.com/pixelz_inc">
                    <img src={Twitter} />
                  </a>
                  <a href="https://www.linkedin.com/company-beta/2370342/">
                    <img src={Linkedin} />
                  </a>
                  <a href="https://plus.google.com/+pixelz_inc">
                    <img src={GooglePlus} />
                  </a>
                  <a href="https://www.pinterest.com/pixelz_inc/">
                    <img src={Pinterest} />
                  </a>
                </div>
                <div className="pull-left pixelz-contact">
                  <div>311 Fourth Avenue, Suite #517, San Diego, CA 92101</div>
                  <div>Email: cs@pixelz.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="clearfix">
                <div className="pull-left footer-outline" style={this.divStyle}>
                  <h6>LEGAL</h6>
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        Cookies
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pull-left footer-outline" style={this.divStyle}>
                  <h6>PLANS</h6>
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        SOLO
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        PRO Retailer
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        PRO Studio
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="clearfix">
                <div className="pull-left footer-outline" style={this.divStyle}>
                  <h6>LEGAL</h6>
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        Cookies
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pull-left footer-outline" style={this.divStyle}>
                  <h6>PLANS</h6>
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        SOLO
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        PRO Retailer
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        PRO Studio
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4 footer-outline">
              <h6>Our customers love us!</h6>
              <ul>
                <li>
                  <a
                    href="https://www.trustpilot.com/review/pixelz.com"
                    target="_blank"
                  >
                    <img src={TrustpilotLogo} style={this.imgStyle} />
                  </a>{' '}
                </li>
                <li>
                  <a
                    href="https://www.trustpilot.com/review/pixelz.com"
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

export default index;
