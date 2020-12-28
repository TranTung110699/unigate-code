import React from 'react';
import { t1, t3, t4 } from 'translate';
import imgDevices from './resources/en-Devices.png';
import './stylesheet.scss';

class Products extends React.Component {
  cssClass = 'lotus-home-page-products';

  render() {
    const title = t3('learning_anywhere_on_any_device');
    const subTitle = t1(
      'it_will_be_great_if_you_can_study,_do_homework,_test,_take_anywhere_at_any_time',
    );

    return (
      <div className={this.cssClass}>
        <div className="container">
          <div
            className={`${this.cssClass}__title col-12
           col-lg-offset-1 col-lg-10 col-lg-offset-1
            col-xl-offset-1 col-xl-10 col-xl-offset-1`}
          >
            {title}
          </div>
          <div
            className={`${this.cssClass}__sub-title
             col-lg-offset-2 col-lg-8 col-lg-offset-2
            col-xl-offset-2 col-xl-8 col-xl-offset-2`}
          >
            {subTitle}
          </div>
          <div className={`${this.cssClass}__content`}>
            <div className="row lotus-devices-app">
              <div className="col-md-offset-3 col-md-3 col-lg-offset-3 col-lg-3 col-sm-offset-3 col-sm-3 col-xs-6">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://itunes.apple.com/us/app/id1135677228?ls=1&amp;mt=8"
                  className="ios-downvote"
                >
                  <p>{t1('free_download_on')}</p>
                  <p className="uppercase">{t4('app_store')}</p>
                </a>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.vieted.xpeak"
                  className="android-downvote"
                >
                  <p>{t1('free_download_on')}</p>
                  <p className="uppercase">{t1('google_play')}</p>
                </a>
              </div>
            </div>
            <div className="row lotus-devices-app">
              <div
                className="col-md-12 col-lg-offset-1 col-lg-10 col-lg-offset-1
            col-xl-offset-1 col-xl-10 col-xl-offset-1"
              >
                <img src={imgDevices} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
