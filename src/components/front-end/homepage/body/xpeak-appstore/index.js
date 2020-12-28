import React from 'react';
import { string } from 'prop-types';
import './stylesheet.scss';

const XpeakAppStore = ({ title }) => (
  <div className="xpeak-appstore">
    <h3 className="uppercase title">
      {title || 'Tải ứng dụng hoàn toàn miễn phí.'}
    </h3>
    <div className="content">
      <a
        href="https://itunes.apple.com/us/app/id1135677228?ls=1&mt=8"
        className="ios-downvote"
      >
        <p>Tải miễn phí tại</p>
        <p className="uppercase">app store</p>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.vieted.xpeak"
        className="android-downvote"
      >
        <p>Tải miễn phí tại</p>
        <p className="uppercase">google play</p>
      </a>
    </div>
  </div>
);

XpeakAppStore.propTypes = {
  title: string,
};

XpeakAppStore.defaultProps = {
  title: null,
};

export default XpeakAppStore;
