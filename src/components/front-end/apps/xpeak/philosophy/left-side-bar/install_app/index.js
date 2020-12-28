import React from 'react';
import './stylesheet.scss';
import './mobile.scss';

class InstallApp extends React.Component {
  render() {
    return (
      <div className="install-app">
        <div className="xpeak-call">
          <p>Còn chờ gì nữa, hãy tải ứng dụng</p>
          <p className="uppercase">Hoàn toàn miễn phí</p>
        </div>
        <div className="row xpeak-devices-app">
          <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
            <a
              href="https://itunes.apple.com/us/app/id1135677228?ls=1&amp;mt=8"
              className="ios-downvote"
            >
              <p>Tải miễn phí tại</p>
              <p className="uppercase">app store</p>
            </a>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.vieted.xpeak"
              className="android-downvote"
            >
              <p>Tải miễn phí tại</p>
              <p className="uppercase">google play</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default InstallApp;
